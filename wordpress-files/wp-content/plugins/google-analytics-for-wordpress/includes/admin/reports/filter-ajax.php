<?php
/**
 * Report Filter & Funnel AJAX handler.
 *
 * Handles CRUD operations for user-defined report filters and eCommerce funnels.
 * Data is stored in WordPress options via get_option() / update_option().
 *
 * @package monsterinsights
 */

class MonsterInsights_Report_Filter_Ajax {

	/**
	 * Option key for storing report filters.
	 *
	 * @var string
	 */
	const OPTION_KEY = 'monsterinsights_report_filters';

	/**
	 * Option key for storing funnel filters.
	 *
	 * @var string
	 */
	const FUNNEL_OPTION_KEY = 'monsterinsights_funnel_filters';

	/**
	 * Constructor. Register AJAX hooks.
	 */
	public function __construct() {
		// Report filter hooks.
		add_action( 'wp_ajax_monsterinsights_get_report_filters', array( $this, 'get_filters' ) );
		add_action( 'wp_ajax_monsterinsights_save_report_filter', array( $this, 'save_filter' ) );
		add_action( 'wp_ajax_monsterinsights_update_report_filter', array( $this, 'update_filter' ) );
		add_action( 'wp_ajax_monsterinsights_delete_report_filter', array( $this, 'delete_filter' ) );

		// Funnel hooks.
		add_action( 'wp_ajax_monsterinsights_overview_report_get_funnel_filters', array( $this, 'get_funnels' ) );
		add_action( 'wp_ajax_monsterinsights_overview_report_save_funnel_filter', array( $this, 'save_funnel' ) );
		add_action( 'wp_ajax_monsterinsights_overview_report_update_funnel_filter', array( $this, 'update_funnel' ) );
		add_action( 'wp_ajax_monsterinsights_overview_report_delete_funnel_filter', array( $this, 'delete_funnel' ) );
		add_action( 'wp_ajax_monsterinsights_overview_report_delete_all_funnel_filters', array( $this, 'delete_all_funnels' ) );
	}

	// ──────────────────────────────────────────────────────
	// Shared helpers
	// ──────────────────────────────────────────────────────

	/**
	 * Verify the AJAX nonce and user capability.
	 *
	 * @param string $capability Required capability. Defaults to 'monsterinsights_view_dashboard' for read operations.
	 *                           Write operations should pass 'monsterinsights_save_settings'.
	 * @return bool True if the request is valid.
	 */
	private function verify_request( $capability = 'monsterinsights_view_dashboard' ) {
		check_ajax_referer( 'mi-admin-nonce', 'nonce' );

		if ( ! current_user_can( $capability ) ) {
			wp_send_json_error( array(
				'message' => __( 'You do not have permission to perform this action.', 'monsterinsights' ),
			) );
			return false;
		}

		return true;
	}

	// ──────────────────────────────────────────────────────
	// Report Filters
	// ──────────────────────────────────────────────────────

	/**
	 * Get all saved filters from the database.
	 *
	 * @return array Array of saved filters.
	 */
	private function get_all_filters() {
		$filters = get_option( self::OPTION_KEY, array() );

		if ( ! is_array( $filters ) ) {
			$filters = array();
		}

		return $filters;
	}

	/**
	 * Save all filters to the database.
	 *
	 * @param array $filters Array of filters to save.
	 * @return bool Whether the option was updated successfully.
	 */
	private function save_all_filters( $filters ) {
		return update_option( self::OPTION_KEY, $filters, false );
	}

	/**
	 * Generate a unique filter ID.
	 *
	 * @return string Unique filter ID.
	 */
	private function generate_filter_id() {
		return 'filter_' . wp_generate_uuid4();
	}

	/**
	 * Sanitize filter data.
	 *
	 * @param array $filter_data Raw filter data.
	 * @return array Sanitized filter data.
	 */
	private function sanitize_filter_data( $filter_data ) {
		$sanitized = array();

		if ( isset( $filter_data['name'] ) ) {
			$sanitized['name'] = sanitize_text_field( $filter_data['name'] );
		}

		if ( isset( $filter_data['device'] ) ) {
			$allowed_devices = array( 'desktop', 'mobile', 'tablet', '' );
			$sanitized['device'] = in_array( $filter_data['device'], $allowed_devices, true )
				? $filter_data['device']
				: '';
		}

		if ( isset( $filter_data['filters'] ) && is_array( $filter_data['filters'] ) ) {
			$sanitized['filters'] = array();

			foreach ( $filter_data['filters'] as $row ) {
				if ( ! is_array( $row ) ) {
					continue;
				}

				$sanitized_row = array(
					'type'      => isset( $row['type'] ) ? sanitize_text_field( $row['type'] ) : '',
					'condition' => isset( $row['condition'] ) ? sanitize_text_field( $row['condition'] ) : 'contains',
					'value'     => isset( $row['value'] ) ? sanitize_text_field( $row['value'] ) : '',
				);

				// Only include rows that have a type and value.
				if ( ! empty( $sanitized_row['type'] ) && ! empty( $sanitized_row['value'] ) ) {
					$sanitized['filters'][] = $sanitized_row;
				}
			}
		}

		return $sanitized;
	}

	/**
	 * AJAX handler: Get all saved report filters.
	 */
	public function get_filters() {
		$this->verify_request();

		$filters = $this->get_all_filters();

		wp_send_json_success( array(
			'filters' => array_values( $filters ),
		) );
	}

	/**
	 * AJAX handler: Save a new report filter.
	 */
	public function save_filter() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$filter_json = isset( $_POST['filter'] ) ? wp_unslash( $_POST['filter'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.

		if ( empty( $filter_json ) ) {
			wp_send_json_error( array(
				'message' => __( 'No filter data provided.', 'monsterinsights' ),
			) );
			return;
		}

		$filter_data = json_decode( $filter_json, true );

		if ( ! is_array( $filter_data ) || empty( $filter_data['name'] ) ) {
			wp_send_json_error( array(
				'message' => __( 'Invalid filter data.', 'monsterinsights' ),
			) );
			return;
		}

		$sanitized = $this->sanitize_filter_data( $filter_data );
		$filter_id = $this->generate_filter_id();

		$new_filter = array_merge(
			array( 'id' => $filter_id ),
			$sanitized
		);

		$filters = $this->get_all_filters();
		$filters[ $filter_id ] = $new_filter;

		$this->save_all_filters( $filters );

		wp_send_json_success( $new_filter );
	}

	/**
	 * AJAX handler: Update an existing report filter.
	 */
	public function update_filter() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$filter_id   = isset( $_POST['filter_id'] ) ? sanitize_text_field( wp_unslash( $_POST['filter_id'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.
		$filter_json = isset( $_POST['filter'] ) ? wp_unslash( $_POST['filter'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.

		if ( empty( $filter_id ) || empty( $filter_json ) ) {
			wp_send_json_error( array(
				'message' => __( 'Missing required filter data.', 'monsterinsights' ),
			) );
			return;
		}

		$filters = $this->get_all_filters();

		if ( ! isset( $filters[ $filter_id ] ) ) {
			wp_send_json_error( array(
				'message' => __( 'Filter not found.', 'monsterinsights' ),
			) );
			return;
		}

		$filter_data = json_decode( $filter_json, true );

		if ( ! is_array( $filter_data ) ) {
			wp_send_json_error( array(
				'message' => __( 'Invalid filter data.', 'monsterinsights' ),
			) );
			return;
		}

		$sanitized = $this->sanitize_filter_data( $filter_data );

		$filters[ $filter_id ] = array_merge(
			$filters[ $filter_id ],
			$sanitized
		);

		$this->save_all_filters( $filters );

		wp_send_json_success( $filters[ $filter_id ] );
	}

	/**
	 * AJAX handler: Delete a saved report filter.
	 */
	public function delete_filter() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$filter_id = isset( $_POST['filter_id'] ) ? sanitize_text_field( wp_unslash( $_POST['filter_id'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.

		if ( empty( $filter_id ) ) {
			wp_send_json_error( array(
				'message' => __( 'No filter ID provided.', 'monsterinsights' ),
			) );
			return;
		}

		$filters = $this->get_all_filters();

		if ( ! isset( $filters[ $filter_id ] ) ) {
			wp_send_json_error( array(
				'message' => __( 'Filter not found.', 'monsterinsights' ),
			) );
			return;
		}

		unset( $filters[ $filter_id ] );

		$this->save_all_filters( $filters );

		wp_send_json_success( array(
			'message' => __( 'Filter deleted successfully.', 'monsterinsights' ),
		) );
	}

	// ──────────────────────────────────────────────────────
	// Funnel Filters
	// ──────────────────────────────────────────────────────

	/**
	 * Get all saved funnels from the database.
	 *
	 * @return array Array of saved funnels.
	 */
	private function get_all_funnels() {
		$funnels = get_option( self::FUNNEL_OPTION_KEY, array() );

		if ( ! is_array( $funnels ) ) {
			$funnels = array();
		}

		return $funnels;
	}

	/**
	 * Save all funnels to the database.
	 *
	 * @param array $funnels Array of funnels to save.
	 * @return bool Whether the option was updated successfully.
	 */
	private function save_all_funnels( $funnels ) {
		return update_option( self::FUNNEL_OPTION_KEY, $funnels, false );
	}

	/**
	 * Generate a unique funnel ID.
	 *
	 * @return string Unique funnel ID.
	 */
	private function generate_funnel_id() {
		return 'funnel_' . wp_generate_uuid4();
	}

	/**
	 * Sanitize funnel data.
	 *
	 * @param array $funnel_data Raw funnel data.
	 * @return array Sanitized funnel data.
	 */
	private function sanitize_funnel_data( $funnel_data ) {
		$sanitized = array();

		if ( isset( $funnel_data['name'] ) ) {
			// Set funnel name maximum to 50 characters
			$sanitized['name'] = substr( sanitize_text_field( $funnel_data['name'] ), 0, 50 );
		}

		if ( isset( $funnel_data['steps'] ) && is_array( $funnel_data['steps'] ) ) {
			$sanitized['steps'] = array();

			foreach ( $funnel_data['steps'] as $step ) {
				if ( ! is_array( $step ) ) {
					continue;
				}

				$sanitized_step = array(
					'type'  => isset( $step['type'] ) ? sanitize_text_field( $step['type'] ) : 'page',
					'value' => isset( $step['value'] ) ? sanitize_text_field( $step['value'] ) : '',
				);

				// Only include steps that have a value.
				if ( ! empty( $sanitized_step['value'] ) ) {
					$sanitized['steps'][] = $sanitized_step;
				}
			}
		}

		return $sanitized;
	}

	/**
	 * AJAX handler: Get all saved funnels.
	 */
	public function get_funnels() {
		$this->verify_request();

		$funnels = $this->get_all_funnels();

		wp_send_json_success( array(
			'funnels' => array_values( $funnels ),
		) );
	}

	/**
	 * AJAX handler: Save a new funnel.
	 */
	public function save_funnel() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$funnel_json = isset( $_POST['funnel'] ) ? wp_unslash( $_POST['funnel'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.

		if ( empty( $funnel_json ) ) {
			wp_send_json_error( array(
				'message' => __( 'No funnel data provided.', 'monsterinsights' ),
			) );
			return;
		}

		$funnel_data = json_decode( $funnel_json, true );

		if ( ! is_array( $funnel_data ) || empty( $funnel_data['name'] ) ) {
			wp_send_json_error( array(
				'message' => __( 'Invalid funnel data.', 'monsterinsights' ),
			) );
			return;
		}

		$sanitized = $this->sanitize_funnel_data( $funnel_data );
		$funnel_id = $this->generate_funnel_id();

		$new_funnel = array_merge(
			array( 'id' => $funnel_id ),
			$sanitized
		);

		$funnels = $this->get_all_funnels();
		$funnels[ $funnel_id ] = $new_funnel;

		$this->save_all_funnels( $funnels );

		wp_send_json_success( $new_funnel );
	}

	/**
	 * AJAX handler: Update an existing funnel.
	 */
	public function update_funnel() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$funnel_id   = isset( $_POST['funnel_id'] ) ? sanitize_text_field( wp_unslash( $_POST['funnel_id'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.
		$funnel_json = isset( $_POST['funnel'] ) ? wp_unslash( $_POST['funnel'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.

		if ( empty( $funnel_id ) || empty( $funnel_json ) ) {
			wp_send_json_error( array(
				'message' => __( 'Missing required funnel data.', 'monsterinsights' ),
			) );
			return;
		}

		$funnels = $this->get_all_funnels();

		if ( ! isset( $funnels[ $funnel_id ] ) ) {
			wp_send_json_error( array(
				'message' => __( 'Funnel not found.', 'monsterinsights' ),
			) );
			return;
		}

		$funnel_data = json_decode( $funnel_json, true );

		if ( ! is_array( $funnel_data ) ) {
			wp_send_json_error( array(
				'message' => __( 'Invalid funnel data.', 'monsterinsights' ),
			) );
			return;
		}

		$sanitized = $this->sanitize_funnel_data( $funnel_data );

		$funnels[ $funnel_id ] = array_merge(
			$funnels[ $funnel_id ],
			$sanitized
		);

		$this->save_all_funnels( $funnels );

		wp_send_json_success( $funnels[ $funnel_id ] );
	}

	/**
	 * AJAX handler: Delete a saved funnel.
	 */
	public function delete_funnel() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$funnel_id = isset( $_POST['funnel_id'] ) ? sanitize_text_field( wp_unslash( $_POST['funnel_id'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- verified in verify_request() above.

		if ( empty( $funnel_id ) ) {
			wp_send_json_error( array(
				'message' => __( 'No funnel ID provided.', 'monsterinsights' ),
			) );
			return;
		}

		$funnels = $this->get_all_funnels();

		if ( ! isset( $funnels[ $funnel_id ] ) ) {
			wp_send_json_error( array(
				'message' => __( 'Funnel not found.', 'monsterinsights' ),
			) );
			return;
		}

		unset( $funnels[ $funnel_id ] );

		$this->save_all_funnels( $funnels );

		wp_send_json_success( array(
			'message' => __( 'Funnel deleted successfully.', 'monsterinsights' ),
		) );
	}

	/**
	 * AJAX handler: Delete all saved funnels.
	 */
	public function delete_all_funnels() {
		$this->verify_request( 'monsterinsights_save_settings' );

		$this->save_all_funnels( array() );

		wp_send_json_success( array(
			'message' => __( 'All funnels deleted successfully.', 'monsterinsights' ),
		) );
	}
}

// Initialize the report filter AJAX handler.
new MonsterInsights_Report_Filter_Ajax();
