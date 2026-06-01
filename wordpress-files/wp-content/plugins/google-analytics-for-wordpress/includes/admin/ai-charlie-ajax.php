<?php
/**
 * AI Charlie Chat AJAX Handlers.
 *
 * Handles save, list, load, and delete operations for AI chat conversations.
 * Uses the MonsterInsights cache system with per-user groups.
 *
 * @package MonsterInsights
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 10 years in seconds — effectively "never expires" for the cache table.
 */
if ( ! defined( 'MONSTERINSIGHTS_AI_CHARLIE_CACHE_EXPIRY' ) ) {
	define( 'MONSTERINSIGHTS_AI_CHARLIE_CACHE_EXPIRY', 315360000 );
}

/**
 * Get the cache group key for a user.
 *
 * @param int $user_id WordPress user ID.
 * @return string Cache group string.
 */
function monsterinsights_ai_charlie_cache_group( $user_id = 0 ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}
	return 'ai_charlie_' . absint( $user_id );
}

/**
 * Save (create or update) a chat conversation.
 *
 * Expects POST['chat'] as a JSON string with: id, title, preview, messages, created_at, updated_at.
 */
function monsterinsights_ai_charlie_save_chat() {
	check_ajax_referer( 'mi-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_send_json_error( array( 'message' => __( 'You do not have permission.', 'google-analytics-for-wordpress' ) ) );
	}

	$raw = isset( $_POST['chat'] ) ? wp_unslash( $_POST['chat'] ) : '';
	$chat = json_decode( $raw, true );

	if ( empty( $chat ) || empty( $chat['id'] ) || empty( $chat['messages'] ) ) {
		wp_send_json_error( array( 'message' => __( 'Invalid chat data.', 'google-analytics-for-wordpress' ) ) );
	}

	$chat_id = sanitize_text_field( $chat['id'] );
	$group   = monsterinsights_ai_charlie_cache_group();
	$key     = 'chat_' . $chat_id;

	// Sanitize each message in the array.
	$sanitized_messages = array();
	foreach ( $chat['messages'] as $msg ) {
		if ( ! is_array( $msg ) || ! isset( $msg['text'] ) ) {
			continue;
		}
		$sanitized_msg = array(
			'id'       => isset( $msg['id'] ) ? absint( $msg['id'] ) : 0,
			'type'     => isset( $msg['type'] ) ? sanitize_text_field( $msg['type'] ) : '',
			'text'     => wp_kses_post( $msg['text'] ),
			'format'   => isset( $msg['format'] ) ? sanitize_text_field( $msg['format'] ) : '',
			'feedback' => isset( $msg['feedback'] ) ? sanitize_text_field( $msg['feedback'] ) : null,
		);

		if ( isset( $msg['runId'] ) ) {
			$sanitized_msg['runId'] = sanitize_text_field( $msg['runId'] );
		}

		if ( ! empty( $msg['insights'] ) && is_array( $msg['insights'] ) ) {
			$sanitized_insights = array();
			foreach ( $msg['insights'] as $insight ) {
				if ( ! is_array( $insight ) ) {
					continue;
				}
				$sanitized_insights[] = array(
					'label'  => isset( $insight['label'] ) ? sanitize_text_field( $insight['label'] ) : '',
					'action' => isset( $insight['action'] ) ? sanitize_text_field( $insight['action'] ) : '',
				);
			}
			$sanitized_msg['insights'] = $sanitized_insights;
		}

		$sanitized_messages[] = $sanitized_msg;
	}

	// Preserve pinned state from existing record if not provided.
	$existing = monsterinsights_cache_get( $key, $group );
	$pinned   = false;
	if ( isset( $chat['pinned'] ) ) {
		$pinned = (bool) $chat['pinned'];
	} elseif ( is_array( $existing ) && ! empty( $existing['pinned'] ) ) {
		$pinned = true;
	}

	$data = array(
		'id'         => $chat_id,
		'title'      => isset( $chat['title'] ) ? sanitize_text_field( $chat['title'] ) : '',
		'preview'    => isset( $chat['preview'] ) ? sanitize_text_field( $chat['preview'] ) : '',
		'messages'   => $sanitized_messages,
		'pinned'     => $pinned,
		'created_at' => isset( $chat['created_at'] ) ? absint( $chat['created_at'] ) : time(),
		'updated_at' => time(),
	);

	$result = monsterinsights_cache_set( $key, $data, $group, MONSTERINSIGHTS_AI_CHARLIE_CACHE_EXPIRY );

	if ( false === $result ) {
		wp_send_json_error( array( 'message' => __( 'Failed to save chat.', 'google-analytics-for-wordpress' ) ) );
	}

	wp_send_json_success( array( 'id' => $chat_id ) );
}
add_action( 'wp_ajax_monsterinsights_ai_charlie_save_chat', 'monsterinsights_ai_charlie_save_chat' );

/**
 * User meta key for storing the list of pinned conversation UUIDs.
 */
if ( ! defined( 'MONSTERINSIGHTS_AI_CHARLIE_PINNED_META_KEY' ) ) {
	define( 'MONSTERINSIGHTS_AI_CHARLIE_PINNED_META_KEY', 'monsterinsights_ai_charlie_pinned_chats' );
}

/**
 * Maximum number of pinned conversations a user can have.
 */
if ( ! defined( 'MONSTERINSIGHTS_AI_CHARLIE_MAX_PINNED' ) ) {
	define( 'MONSTERINSIGHTS_AI_CHARLIE_MAX_PINNED', 50 );
}

/**
 * Get the pinned conversation UUIDs for a user from user meta.
 *
 * @param int $user_id WordPress user ID (defaults to current user).
 * @return array Array of UUID strings.
 */
function monsterinsights_ai_charlie_get_pinned_ids( $user_id = 0 ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}
	$ids = get_user_meta( $user_id, MONSTERINSIGHTS_AI_CHARLIE_PINNED_META_KEY, true );
	return is_array( $ids ) ? $ids : array();
}

/**
 * List all saved chats for the current user (metadata only, no messages).
 */
function monsterinsights_ai_charlie_get_chats() {
	check_ajax_referer( 'mi-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_send_json_error( array( 'message' => __( 'You do not have permission.', 'google-analytics-for-wordpress' ) ) );
	}

	global $wpdb;

	$per_page = 20;
	$page     = isset( $_POST['page'] ) ? max( 1, (int) $_POST['page'] ) : 1; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified above via check_ajax_referer.
	$offset   = ( $page - 1 ) * $per_page;

	$cache_table = new MonsterInsights_Cache_Table();
	$table       = $cache_table->get_table_name();
	$group       = monsterinsights_ai_charlie_cache_group();

	// Fetch one extra row to detect whether a next page exists without a COUNT(*) query.
	$rows = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT cache_value FROM {$table} WHERE cache_group = %s AND expires_at > NOW() ORDER BY expires_at DESC LIMIT %d OFFSET %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name from MonsterInsights_Cache_Table, not user input.
			$group,
			$per_page + 1,
			$offset
		)
	);

	$has_more = count( $rows ) > $per_page;
	if ( $has_more ) {
		array_pop( $rows );
	}

	// Rows arrive ordered by expires_at DESC, which acts as a last-saved
	// timestamp because every save renews the cache TTL. That gives us a
	// "most recently used" ordering across all pages — matches typical chat
	// history UX (ChatGPT/Claude). We deliberately don't re-sort here by
	// created_at: a per-page usort would only reshuffle within a page and
	// break chronology across page boundaries.
	$chats = array();
	foreach ( $rows as $row ) {
		$data = maybe_unserialize( $row->cache_value );
		if ( ! is_array( $data ) ) {
			continue;
		}
		$chats[] = array(
			'id'         => isset( $data['id'] ) ? $data['id'] : '',
			'title'      => isset( $data['title'] ) ? $data['title'] : '',
			'preview'    => isset( $data['preview'] ) ? $data['preview'] : '',
			'pinned'     => ! empty( $data['pinned'] ),
			'created_at' => isset( $data['created_at'] ) ? $data['created_at'] : 0,
			'updated_at' => isset( $data['updated_at'] ) ? $data['updated_at'] : 0,
		);
	}

	wp_send_json_success( array(
		'chats'    => $chats,
		'has_more' => $has_more,
	) );
}
add_action( 'wp_ajax_monsterinsights_ai_charlie_get_chats', 'monsterinsights_ai_charlie_get_chats' );

/**
 * Return pinned (saved) conversations for the current user.
 *
 * Pinned UUIDs are stored in user meta. We look them up directly by cache_key,
 * so no full-table scan is needed. Hard cap: MONSTERINSIGHTS_AI_CHARLIE_MAX_PINNED.
 */
function monsterinsights_ai_charlie_get_saved_chats() {
	check_ajax_referer( 'mi-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_send_json_error( array( 'message' => __( 'You do not have permission.', 'google-analytics-for-wordpress' ) ) );
	}

	$pinned_ids = monsterinsights_ai_charlie_get_pinned_ids();

	if ( empty( $pinned_ids ) ) {
		wp_send_json_success( array( 'chats' => array() ) );
		return;
	}

	global $wpdb;

	$cache_table = new MonsterInsights_Cache_Table();
	$table       = $cache_table->get_table_name();
	$group       = monsterinsights_ai_charlie_cache_group();

	$keys         = array_map( function( $id ) { return 'chat_' . $id; }, $pinned_ids );
	$placeholders = implode( ',', array_fill( 0, count( $keys ), '%s' ) );

	$rows = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT cache_value FROM {$table} WHERE cache_group = %s AND cache_key IN ({$placeholders}) AND expires_at > NOW()", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name from MonsterInsights_Cache_Table; placeholders built from array_fill, not user input.
			array_merge( array( $group ), $keys )
		)
	);

	$chats = array();
	foreach ( $rows as $row ) {
		$data = maybe_unserialize( $row->cache_value );
		if ( ! is_array( $data ) ) {
			continue;
		}
		$chats[] = array(
			'id'         => isset( $data['id'] ) ? $data['id'] : '',
			'title'      => isset( $data['title'] ) ? $data['title'] : '',
			'preview'    => isset( $data['preview'] ) ? $data['preview'] : '',
			'pinned'     => true,
			'created_at' => isset( $data['created_at'] ) ? $data['created_at'] : 0,
			'updated_at' => isset( $data['updated_at'] ) ? $data['updated_at'] : 0,
		);
	}
	usort( $chats, function( $a, $b ) {
		return $b['created_at'] - $a['created_at'];
	} );

	wp_send_json_success( array( 'chats' => $chats ) );
}
add_action( 'wp_ajax_monsterinsights_ai_charlie_get_saved_chats', 'monsterinsights_ai_charlie_get_saved_chats' );

/**
 * Load a single chat conversation with full messages.
 *
 * Expects POST['chat_id'].
 */
function monsterinsights_ai_charlie_load_chat() {
	check_ajax_referer( 'mi-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_send_json_error( array( 'message' => __( 'You do not have permission.', 'google-analytics-for-wordpress' ) ) );
	}

	$chat_id = isset( $_POST['chat_id'] ) ? sanitize_text_field( wp_unslash( $_POST['chat_id'] ) ) : '';

	if ( empty( $chat_id ) ) {
		wp_send_json_error( array( 'message' => __( 'Missing chat ID.', 'google-analytics-for-wordpress' ) ) );
	}

	$group = monsterinsights_ai_charlie_cache_group();
	$key   = 'chat_' . $chat_id;
	$data  = monsterinsights_cache_get( $key, $group );

	if ( false === $data ) {
		wp_send_json_error( array( 'message' => __( 'Chat not found.', 'google-analytics-for-wordpress' ) ) );
	}

	wp_send_json_success( array( 'chat' => $data ) );
}
add_action( 'wp_ajax_monsterinsights_ai_charlie_load_chat', 'monsterinsights_ai_charlie_load_chat' );

/**
 * Delete a saved chat conversation.
 *
 * Expects POST['chat_id'].
 */
function monsterinsights_ai_charlie_delete_chat() {
	check_ajax_referer( 'mi-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_send_json_error( array( 'message' => __( 'You do not have permission.', 'google-analytics-for-wordpress' ) ) );
	}

	$chat_id = isset( $_POST['chat_id'] ) ? sanitize_text_field( wp_unslash( $_POST['chat_id'] ) ) : '';

	if ( empty( $chat_id ) ) {
		wp_send_json_error( array( 'message' => __( 'Missing chat ID.', 'google-analytics-for-wordpress' ) ) );
	}

	$group = monsterinsights_ai_charlie_cache_group();
	$key   = 'chat_' . $chat_id;

	monsterinsights_cache_delete( $key, $group );

	// Remove from pinned user meta if present.
	$user_id    = get_current_user_id();
	$pinned_ids = monsterinsights_ai_charlie_get_pinned_ids( $user_id );
	$pinned_ids = array_values( array_filter( $pinned_ids, function( $id ) use ( $chat_id ) {
		return $id !== $chat_id;
	} ) );
	update_user_meta( $user_id, MONSTERINSIGHTS_AI_CHARLIE_PINNED_META_KEY, $pinned_ids );

	wp_send_json_success();
}
add_action( 'wp_ajax_monsterinsights_ai_charlie_delete_chat', 'monsterinsights_ai_charlie_delete_chat' );

/**
 * Toggle the pinned state of a chat conversation.
 *
 * Expects POST['chat_id'] and POST['pinned'] (1 or 0).
 */
function monsterinsights_ai_charlie_pin_chat() {
	check_ajax_referer( 'mi-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
		wp_send_json_error( array( 'message' => __( 'You do not have permission.', 'google-analytics-for-wordpress' ) ) );
	}

	$chat_id = isset( $_POST['chat_id'] ) ? sanitize_text_field( wp_unslash( $_POST['chat_id'] ) ) : '';
	$pinned  = isset( $_POST['pinned'] ) ? (bool) absint( $_POST['pinned'] ) : false;

	if ( empty( $chat_id ) ) {
		wp_send_json_error( array( 'message' => __( 'Missing chat ID.', 'google-analytics-for-wordpress' ) ) );
	}

	$group = monsterinsights_ai_charlie_cache_group();
	$key   = 'chat_' . $chat_id;
	$data  = monsterinsights_cache_get( $key, $group );

	if ( ! is_array( $data ) ) {
		wp_send_json_error( array( 'message' => __( 'Chat not found.', 'google-analytics-for-wordpress' ) ) );
	}

	$data['pinned']     = $pinned;
	$data['updated_at'] = time();

	monsterinsights_cache_set( $key, $data, $group, MONSTERINSIGHTS_AI_CHARLIE_CACHE_EXPIRY );

	// Keep user meta pinned list in sync.
	$user_id    = get_current_user_id();
	$pinned_ids = monsterinsights_ai_charlie_get_pinned_ids( $user_id );

	if ( $pinned ) {
		if ( ! in_array( $chat_id, $pinned_ids, true ) ) {
			if ( count( $pinned_ids ) >= MONSTERINSIGHTS_AI_CHARLIE_MAX_PINNED ) {
				wp_send_json_error( array( 'message' => __( 'You have reached the maximum number of saved conversations.', 'google-analytics-for-wordpress' ) ) );
				return;
			}
			$pinned_ids[] = $chat_id;
		}
	} else {
		$pinned_ids = array_values( array_filter( $pinned_ids, function( $id ) use ( $chat_id ) {
			return $id !== $chat_id;
		} ) );
	}

	update_user_meta( $user_id, MONSTERINSIGHTS_AI_CHARLIE_PINNED_META_KEY, $pinned_ids );

	wp_send_json_success( array( 'pinned' => $pinned ) );
}
add_action( 'wp_ajax_monsterinsights_ai_charlie_pin_chat', 'monsterinsights_ai_charlie_pin_chat' );
