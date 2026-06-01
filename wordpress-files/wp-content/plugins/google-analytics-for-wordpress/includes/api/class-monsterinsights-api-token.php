<?php
/**
 * API Token class for MonsterInsights.
 *
 * Generates encrypted tokens for secure browser-to-API communication.
 * Used by Custom Dashboard, AI Chat, and any feature needing direct
 * browser-to-Laravel requests without proxying through WordPress.
 *
 * Token Format: {publickey}.{base64(hmac + iv + ciphertext)}
 *
 * Security Features:
 * - AES-256-CBC encryption
 * - HMAC-SHA256 integrity verification
 * - 30-minute token expiration
 * - Site-specific encryption key (relay token)
 *
 * @since 9.x.x
 * @package MonsterInsights
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * MonsterInsights API Token class.
 *
 * @since 9.x.x
 */
class MonsterInsights_API_Token {

	/**
	 * Token expiration time in seconds (30 minutes).
	 *
	 * @var int
	 */
	const TOKEN_EXPIRATION = 1800;

	/**
	 * Cache group for storing generated tokens.
	 *
	 * @var string
	 */
	const CACHE_GROUP = 'api_tokens';

	/**
	 * Encryption cipher.
	 *
	 * @var string
	 */
	const CIPHER = 'AES-256-CBC';

	/**
	 * Generate an encrypted token for browser-to-API communication.
	 *
	 * The token contains encrypted user and site context that can be
	 * validated by Laravel/Python without calling back to WordPress.
	 *
	 * @since 9.x.x
	 *
	 * @param bool $network Whether to use network credentials.
	 * @return array|WP_Error Token data array or WP_Error on failure.
	 *                        {
	 *                            'token'      => string, // The encrypted token
	 *                            'expires_at' => int,    // Unix timestamp
	 *                        }
	 */
	public static function generate( $network = false ) {
		$auth = MonsterInsights()->auth;

		// Get relay credentials.
		$public_key = $network ? $auth->get_network_key() : $auth->get_key();
		$token_key  = $network ? $auth->get_network_token() : $auth->get_token();

		if ( empty( $public_key ) || empty( $token_key ) ) {
			return new WP_Error(
				'not_authenticated',
				__( 'Site is not authenticated with MonsterInsights.', 'google-analytics-for-wordpress' )
			);
		}

		// Build payload - minimal data needed for validation.
		$timestamp  = time();
		$expires_at = $timestamp + self::TOKEN_EXPIRATION;

		// Include the license key so the AI Chat API can determine the plan
		// without a DB lookup. Lite users have no license key.
		$license_key = '';
		if ( monsterinsights_is_pro_version() ) {
			$license_key = $network
				? MonsterInsights()->license->get_network_license_key()
				: MonsterInsights()->license->get_site_license_key();
		}

		$payload = array(
			'site_url'   => $network ? network_admin_url() : home_url(),
			'license'    => $license_key ?: '',
			'issued_at'  => $timestamp,
			'expires_at' => $expires_at,
		);

		// Encrypt the payload.
		$encrypted = self::encrypt_payload( $payload, $token_key );

		if ( is_wp_error( $encrypted ) ) {
			return $encrypted;
		}

		// Final token format: publickey.encrypted_payload
		$token = $public_key . '.' . $encrypted;

		return array(
			'token'      => $token,
			'expires_at' => $expires_at,
		);
	}

	/**
	 * Get a cached token or generate a new one.
	 *
	 * Tokens are cached at site-level since all users see the same analytics data.
	 * A 5-minute buffer is used to refresh tokens before they expire.
	 *
	 * @since 9.x.x
	 *
	 * @param bool $network Whether to use network credentials.
	 * @return array|WP_Error Token data array or WP_Error on failure.
	 */
	public static function get_token( $network = false ) {
		// Ensure user has permission to view dashboard data.
		if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
			return new WP_Error(
				'unauthorized',
				__( 'You do not have permission to access this data.', 'google-analytics-for-wordpress' )
			);
		}

		$cache_key = 'api_token_site' . ( $network ? '_network' : '' );

		// Try to get cached token.
		$cached = monsterinsights_cache_get( $cache_key, self::CACHE_GROUP );

		// Check if cached token is still valid (with 5-minute buffer).
		if ( $cached && isset( $cached['expires_at'] ) ) {
			$buffer = 300; // 5 minutes.
			if ( $cached['expires_at'] > ( time() + $buffer ) ) {
				return $cached;
			}
		}

		// Generate new token.
		$token_data = self::generate( $network );

		if ( is_wp_error( $token_data ) ) {
			return $token_data;
		}

		// Cache the token (TTL = expiration - buffer).
		$ttl = ( $token_data['expires_at'] - time() ) - 300;
		if ( $ttl > 0 ) {
			monsterinsights_cache_set( $cache_key, $token_data, self::CACHE_GROUP, $ttl );
		}

		return $token_data;
	}

	/**
	 * AJAX handler to fetch a fresh API token for the current context.
	 *
	 * This mirrors the behavior on full page load, but can be invoked
	 * from JavaScript via wp.ajax to refresh the Bearer token when it is
	 * close to expiring without reloading the page.
	 *
	 * @since 9.x.x
	 *
	 * Expects:
	 * - $_POST['nonce'] = wp_create_nonce( 'mi-admin-nonce' )
	 */
	public static function ajax_get_token() {
		// Validate nonce.
		check_ajax_referer( 'mi-admin-nonce', 'nonce' );

		// Get token for current admin context (site or network).
		$token_data = self::get_token( is_network_admin() );

		if ( is_wp_error( $token_data ) ) {
			wp_send_json_error(
				array(
					'code'    => $token_data->get_error_code(),
					'message' => $token_data->get_error_message(),
				),
				403
			);
		}

		wp_send_json_success( $token_data );
	}

	/**
	 * Get just the token string (convenience method for wp_localize_script).
	 *
	 * @since 9.x.x
	 *
	 * @param bool $network Whether to use network credentials.
	 * @return string The token string or empty string on failure.
	 */
	public static function get_token_string( $network = false ) {
		$token_data = self::get_token( $network );

		if ( is_wp_error( $token_data ) ) {
			return '';
		}

		return $token_data['token'];
	}

	/**
	 * Get the token expiration timestamp.
	 *
	 * @since 9.x.x
	 *
	 * @param bool $network Whether to use network credentials.
	 * @return int Unix timestamp or 0 on failure.
	 */
	public static function get_expiration( $network = false ) {
		$token_data = self::get_token( $network );

		if ( is_wp_error( $token_data ) ) {
			return 0;
		}

		return $token_data['expires_at'];
	}

	/**
	 * Invalidate cached token for the site.
	 *
	 * Call this when relay credentials change or are deauthenticated.
	 *
	 * @since 9.x.x
	 *
	 * @param bool $network Whether to invalidate network token.
	 * @return bool True on success.
	 */
	public static function invalidate( $network = false ) {
		$cache_key = 'api_token_site' . ( $network ? '_network' : '' );

		return monsterinsights_cache_delete( $cache_key, self::CACHE_GROUP );
	}

	/**
	 * Encrypt the payload using AES-256-CBC.
	 *
	 * @since 9.x.x
	 *
	 * @param array  $payload  The data to encrypt.
	 * @param string $key_seed The seed for deriving the encryption key (relay token).
	 * @return string|WP_Error Base64-encoded encrypted data or WP_Error.
	 */
	private static function encrypt_payload( $payload, $key_seed ) {
		// Check if OpenSSL is available.
		if ( ! function_exists( 'openssl_encrypt' ) ) {
			return new WP_Error(
				'openssl_missing',
				__( 'OpenSSL extension is required for secure API tokens.', 'google-analytics-for-wordpress' )
			);
		}

		$payload_json = wp_json_encode( $payload );

		if ( false === $payload_json ) {
			return new WP_Error(
				'json_encode_failed',
				__( 'Failed to encode token payload.', 'google-analytics-for-wordpress' )
			);
		}

		// Derive encryption key (SHA256 of the relay token).
		$key = hash( 'sha256', $key_seed, true ); // 32 bytes.

		// Generate random IV.
		$iv = openssl_random_pseudo_bytes( 16 );

		if ( false === $iv ) {
			return new WP_Error(
				'iv_generation_failed',
				__( 'Failed to generate secure IV.', 'google-analytics-for-wordpress' )
			);
		}

		// Encrypt with AES-256-CBC.
		$ciphertext = openssl_encrypt(
			$payload_json,
			self::CIPHER,
			$key,
			OPENSSL_RAW_DATA,
			$iv
		);

		if ( false === $ciphertext ) {
			return new WP_Error(
				'encryption_failed',
				__( 'Failed to encrypt token payload.', 'google-analytics-for-wordpress' )
			);
		}

		// Create HMAC for integrity (sign: iv + ciphertext).
		$hmac = hash_hmac( 'sha256', $iv . $ciphertext, $key_seed, true ); // 32 bytes.

		// Combine: hmac(32) + iv(16) + ciphertext.
		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		return base64_encode( $hmac . $iv . $ciphertext );
	}

}

// AJAX action to allow JS to request a fresh Bearer token without full page reload.
add_action(
	'wp_ajax_monsterinsights_get_bearer_token',
	array( 'MonsterInsights_API_Token', 'ajax_get_token' )
);
