<?php
/**
 * Overview Report AJAX handler.
 *
 * Registers and handles the monsterinsights_get_overview_data action.
 *
 * @package MonsterInsights
 */

defined( 'ABSPATH' ) || exit;

class MonsterInsights_Overview_Ajax {

	/**
	 * Constructor - Register AJAX hook.
	 */
	public function __construct() {
		add_action( 'wp_ajax_monsterinsights_get_overview_data', array( $this, 'handle_request' ) );
	}

	/**
	 * AJAX handler for fetching overview report data.
	 *
	 * @return void Outputs JSON response via wp_send_json_success() or wp_send_json_error()
	 */
	public function handle_request() {
		check_ajax_referer( 'mi-admin-nonce', 'nonce' );

		if ( ! current_user_can( 'monsterinsights_view_dashboard' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to view this data.', 'google-analytics-for-wordpress' ) ) );
		}

		$date_range = ! empty( $_POST['date_range'] ) ? json_decode( stripslashes( $_POST['date_range'] ), true ) : array();

		if ( empty( $date_range['start'] ) || empty( $date_range['end'] ) ) {
			$date_range = $this->get_default_date_range( 30 );
		} else {
			$end_date = strtotime( $date_range['end'] );
			$today    = strtotime( 'today' );
			if ( $end_date > $today ) {
				$date_range['end'] = gmdate( 'Y-m-d', $today );
			}
		}

		$api          = new MonsterInsights_API_Overview();
		$api_response = $api->get_overview( $date_range['start'], $date_range['end'] );

		if ( is_wp_error( $api_response ) ) {
			wp_send_json_error( array( 'message' => $api_response->get_error_message() ) );
		}

		if ( $api_response instanceof MonsterInsights_API_Error ) {
			wp_send_json_error( array( 'message' => $api_response->get_error_message() ) );
		}

		$overview_data = isset( $api_response[ MonsterInsights_API_Overview::QUERY_ID ] )
			? $api_response[ MonsterInsights_API_Overview::QUERY_ID ]
			: array();

		wp_send_json_success( array(
			'date_range' => $date_range,
			'overview'   => $overview_data,
		) );
	}

	/**
	 * Build a default date range when none is provided.
	 *
	 * @param int $days Number of days to include (inclusive of today).
	 *
	 * @return array {
	 *     @type string $start Start date (Y-m-d).
	 *     @type string $end   End date (Y-m-d).
	 * }
	 */
	private function get_default_date_range( $days = 30 ) {
		$days       = max( 1, (int) $days );
		$end_ts     = strtotime( 'today' );
		$start_ts   = strtotime( '-' . ( $days - 1 ) . ' days', $end_ts );

		return array(
			'start' => gmdate( 'Y-m-d', $start_ts ),
			'end'   => gmdate( 'Y-m-d', $end_ts ),
		);
	}
}
