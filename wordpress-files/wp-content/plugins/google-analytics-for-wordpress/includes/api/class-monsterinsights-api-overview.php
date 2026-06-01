<?php
/**
 * Overview Report API Client class for MonsterInsights.
 *
 * Fetches campaign, page, and device data with TotalUsers, PageViews, and BounceRate.
 * Uses the same reporting relay API endpoint as the Custom Dashboard, but is exposed
 * as a standalone API client that extends the base MonsterInsights_API_Client.
 *
 * @package MonsterInsights
 */

defined( 'ABSPATH' ) || exit;

class MonsterInsights_API_Overview extends MonsterInsights_API_Client {

	/**
	 * Overview report query ID.
	 *
	 * This ID is used by the remote reporting service to key the response.
	 */
	const QUERY_ID = 'overview';

	/**
	 * Default dimensions for the overview report.
	 *
	 * Maps to GA4 Data API dimension names:
	 * - date: Date (YYYYMMDD)
	 * - sessionCampaignName: Campaign - Name
	 * - sessionSource: Campaign - Source
	 * - sessionMedium: Campaign - Medium
	 * - firstUserManualTerm: Campaign - Term
	 * - landingPage: Page - Landing Page
	 * - pageTitle: Page - Title
	 * - deviceCategory: Device
	 *
	 * @var array
	 */
	protected static $dimensions = array(
		'date',
		'sessionCampaignName',
		'sessionSource',
		'sessionMedium',
		'firstUserManualTerm',
		'landingPage',
		'pageTitle',
		'deviceCategory',
	);

	/**
	 * Default metrics for the overview report.
	 *
	 * Maps to GA4 Data API metric names:
	 * - totalUsers: Total Users
	 * - screenPageViews: Page Views
	 * - bounceRate: Bounce Rate
	 *
	 * @var array
	 */
	protected static $metrics = array(
		'totalUsers',
		'screenPageViews',
		'sessions',
		'bounceRate',
		'ecommercePurchases',
		'averagePurchaseRevenue',
		'newUsers',
		'engagementRate',
		'totalRevenue',
	);

	/**
	 * Build the overview API query payload (without date range).
	 *
	 * @return array Query parameters for the reporting API.
	 */
	public static function build_query() {
		return array(
			'id'         => self::QUERY_ID,
			'dimensions' => self::$dimensions,
			'metrics'    => self::$metrics,
			'compare'    => false,
			'limit'      => 100,
			'groupBy'    => 'date',
		);
	}

	/**
	 * Normalize an input date range array using MonsterInsights_Report logic.
	 *
	 * Ensures we always have a valid start/end range and that the end date is not in the future.
	 *
	 * @param array $date_range {
	 *    Optional. Raw date range input.
	 *
	 *    @type string $start Start date (Y-m-d).
	 *    @type string $end   End date (Y-m-d).
	 * }
	 *
	 * @return array Normalized date range with 'start' and 'end' keys.
	 */
	public function normalize_date_range( $date_range = array() ) {
		if ( empty( $date_range['start'] ) || empty( $date_range['end'] ) ) {
			// Fallback to last 30 days when dates are missing.
			$date_range = $this->get_default_date_range( 30 );
		} else {
			// Ensure end date is not in the future.
			$end_date = strtotime( $date_range['end'] );
			$today    = strtotime( 'today' );

			if ( $end_date > $today ) {
				$date_range['end'] = gmdate( 'Y-m-d', $today );
			}
		}

		return $date_range;
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

	/**
	 * Parse and normalize the date range coming from $_POST['date_range'].
	 *
	 * Mirrors the behaviour in MonsterInsights_Custom_Dashboard_Ajax::get_custom_dashboard_data().
	 *
	 * @return array Normalized date range with 'start' and 'end'.
	 */
	public function get_date_range_from_request() {
		$date_range = array();

		if ( ! empty( $_POST['date_range'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$decoded = json_decode( stripslashes( $_POST['date_range'] ), true ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( is_array( $decoded ) ) {
				$date_range = $decoded;
			}
		}

		return $this->normalize_date_range( $date_range );
	}

	/**
	 * High-level helper: get overview data for the current request's date_range POST param.
	 *
	 * This is intended to be called from AJAX handlers so that the date range
	 * parsing/normalization logic lives in a single place (the API client).
	 *
	 * @return array|WP_Error|MonsterInsights_API_Error Response data keyed by overview ID, or error.
	 */
	public function get_overview_for_request() {
		$date_range = $this->get_date_range_from_request();

		return $this->get_overview(
			$date_range['start'],
			$date_range['end']
		);
	}

	/**
	 * Get overview report data for an explicit start/end date range.
	 *
	 * @param string $start Start date (Y-m-d).
	 * @param string $end   End date (Y-m-d).
	 *
	 * @return array|WP_Error|MonsterInsights_API_Error Response data keyed by 'overview', or error.
	 */
	public function get_overview( $start, $end ) {
		$queries = array( self::build_query() );

		return $this->query(
			$start,
			$end,
			$queries
		);
	}

	/**
	 * Execute the overview reporting query.
	 *
	 * @param string $start   Start date (Y-m-d).
	 * @param string $end     End date (Y-m-d).
	 * @param array  $queries List of query definitions.
	 *
	 * @return array|WP_Error|MonsterInsights_API_Error
	 */
	public function query( $start, $end, $queries ) {
		$body = array(
			'start'          => $start,
			'end'            => $end,
			'queries'        => $queries,
			'plugin_version' => MONSTERINSIGHTS_VERSION,
		);

		return $this->request( 'api/v3/reporting/query', $body, 'POST' );
	}

	/**
	 * Override the parent request method to match the reporting relay API requirements.
	 *
	 * This is essentially the same as MonsterInsights_API_Custom_Dashboard::request(),
	 * adapted to this standalone client.
	 *
	 * @param string $endpoint The API endpoint.
	 * @param array  $params   The request parameters.
	 * @param string $method   The request method.
	 *
	 * @return array|WP_Error|MonsterInsights_API_Error
	 */
	protected function request( $endpoint, $params = array(), $method = 'POST' ) {
		$url = trailingslashit( $this->base_url ) . $endpoint;

		$args = array(
			'method'  => $method,
			'timeout' => 15, // phpcs:ignore WordPressVIPMinimum.Performance.RemoteRequestTimeout.timeout_timeout -- relay API needs adequate time.
			'headers' => array(
				'X-Relay-License'  => $this->license,
				'X-Relay-Site-Key' => $this->key,
				'X-Relay-Token'    => $this->token,
				'X-Relay-Site-URL' => $this->site_url,
				'Content-Type'     => 'application/json',
			),
			'body' => wp_json_encode( $params ),
		);

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = wp_remote_retrieve_body( $response );
		$decoded_body  = json_decode( $response_body, true );

		// Check for successful response.
		if ( $response_code >= 200 && $response_code < 300 ) {
			if ( isset( $decoded_body['success'] ) && $decoded_body['success'] ) {
				return isset( $decoded_body['data'] ) ? $decoded_body['data']['data'] : array();
			}
		}

		// Handle error responses with a MonsterInsights_API_Error shape.
		if ( isset( $decoded_body['error'] ) && is_array( $decoded_body['error'] ) ) {
			if ( isset( $decoded_body['error']['code'], $decoded_body['error']['message'] ) ) {
				return new MonsterInsights_API_Error( $decoded_body );
			}
		}

		// Fallback error handling.
		$error_message = __( 'An unknown error occurred.', 'google-analytics-for-wordpress' );

		if ( isset( $decoded_body['message'] ) ) {
			$error_message = $decoded_body['message'];
		} elseif ( isset( $decoded_body['error'] ) && is_string( $decoded_body['error'] ) ) {
			$error_message = $decoded_body['error'];
		}

		return new WP_Error(
			'api_error',
			$error_message,
			array(
				'response_code' => $response_code,
				'response_body' => $response_body,
			)
		);
	}
}
