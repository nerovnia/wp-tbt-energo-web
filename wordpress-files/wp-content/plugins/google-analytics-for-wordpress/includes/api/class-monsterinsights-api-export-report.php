<?php
/**
 * Generic Export Report API Client.
 *
 * Uses a registry pattern so any report type can register its own query builder.
 * Sends queries to the relay API at app.monsterinsights.com and returns keyed
 * response data suitable for the Export Formatter.
 *
 * @package MonsterInsights
 */

defined( 'ABSPATH' ) || exit;

class MonsterInsights_API_Export_Report extends MonsterInsights_API_Client {

	/**
	 * Registry of query builders keyed by report type.
	 *
	 * Each value is a callable that accepts an array of filters and returns
	 * an array of query definitions to send to the relay API.
	 *
	 * @var array<string, callable>
	 */
	private static $query_builders = array();

	/**
	 * Export queries send many sub-queries in a single batch,
	 * so we need a longer timeout than the default 3 seconds.
	 *
	 * @var int
	 */
	protected $timeout = 30;

	/**
	 * Register a query builder for a report type.
	 *
	 * @param string   $report_type Report identifier (e.g. 'overview', 'ecommerce').
	 * @param callable $builder     fn( array $filters ): array — returns query definitions.
	 */
	public static function register_query_builder( $report_type, $builder ) {
		self::$query_builders[ $report_type ] = $builder;
	}

	/**
	 * Check whether a report type has a registered query builder.
	 *
	 * @param string $report_type Report identifier.
	 * @return bool
	 */
	public static function has_query_builder( $report_type ) {
		return isset( self::$query_builders[ $report_type ] );
	}

	/**
	 * Fetch export data for any registered report type.
	 *
	 * @param string $report_type Report identifier.
	 * @param string $start       Start date (Y-m-d).
	 * @param string $end         End date (Y-m-d).
	 * @param array  $filters     Optional relay API filters { operator, conditions }.
	 * @return array|WP_Error|MonsterInsights_API_Error Keyed response data or error.
	 */
	/**
	 * Maximum queries per API batch request (GA4 limit).
	 *
	 * @var int
	 */
	const MAX_QUERIES_PER_BATCH = 5;

	public function get_export_data( $report_type, $start, $end, $filters = array() ) {
		if ( ! self::has_query_builder( $report_type ) ) {
			return new WP_Error(
				'no_query_builder',
				sprintf(
					/* translators: %s is the report type identifier */
					__( 'No export query builder registered for report type: %s', 'google-analytics-premium' ),
					$report_type
				)
			);
		}

		$builder = self::$query_builders[ $report_type ];
		$queries = call_user_func( $builder, $filters );

		if ( empty( $queries ) || ! is_array( $queries ) ) {
			return new WP_Error( 'empty_queries', __( 'Query builder returned no queries.', 'google-analytics-premium' ) );
		}

		// GA4 limits batch requests to 5 queries. Split into chunks and merge results.
		$batches     = array_chunk( $queries, self::MAX_QUERIES_PER_BATCH );
		$merged_data = array();

		foreach ( $batches as $batch ) {
			$body = array(
				'start'          => $start,
				'end'            => $end,
				'queries'        => $batch,
				'plugin_version' => MONSTERINSIGHTS_VERSION,
			);

			$response = $this->request( 'reporting/query', $body, 'POST' );

			if ( is_wp_error( $response ) || $response instanceof MonsterInsights_API_Error ) {
				return $response;
			}

			if ( is_array( $response ) ) {
				$merged_data = array_merge( $merged_data, $response );
			}
		}

		return $merged_data;
	}

	/**
	 * Send a request to the App API and unwrap the response envelope.
	 *
	 * The App API wraps successful data in { success, data: { data: { ... } } }.
	 * The parent returns the raw decoded body on 2xx; this override unwraps it
	 * so callers receive the inner data directly.
	 *
	 * @param string $endpoint API path relative to base_url (e.g. 'reporting/query').
	 * @param array  $params   Request body parameters.
	 * @param string $method   HTTP method.
	 * @return array|WP_Error|MonsterInsights_API_Error
	 */
	protected function request( $endpoint, $params = array(), $method = 'POST' ) {
		$response = parent::request( $endpoint, $params, $method );

		if ( is_wp_error( $response ) || $response instanceof MonsterInsights_API_Error ) {
			return $response;
		}

		if ( isset( $response['success'] ) && $response['success'] ) {
			return isset( $response['data']['data'] ) ? $response['data']['data'] : array();
		}

		return $response;
	}
}
