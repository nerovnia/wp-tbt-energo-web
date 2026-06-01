<?php
/**
 * AI Charlie Assets Loader
 *
 * Injects the AI Charlie chat assistant module on ALL MonsterInsights admin pages
 * (both Vue 2 and Vue 3 pages).
 *
 * @package monsterinsights
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class MonsterInsights_AI_Charlie_Assets
 */
class MonsterInsights_AI_Charlie_Assets {

	/**
	 * Script handle for AI Charlie.
	 */
	const SCRIPT_HANDLE = 'monsterinsights-ai-charlie';

	/**
	 * Vue 3 manifest data cache.
	 *
	 * @var array|null
	 */
	private static $manifest_data = null;

	/**
	 * Version path (pro or lite).
	 *
	 * @var string
	 */
	private $version_path;

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Load AJAX handlers for chat persistence.
		require_once plugin_dir_path( __FILE__ ) . 'ai-charlie-ajax.php';

		$this->version_path = monsterinsights_is_pro_version() ? 'pro' : 'lite';

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ), 15 );
		add_filter( 'monsterinsights_localize_script_data', array( $this, 'add_ai_chat_config' ) );

		// Add type="module" for ES modules.
		global $wp_version;
		if ( version_compare( $wp_version, '6.4', '>=' ) ) {
			add_filter( 'wp_script_attributes', array( $this, 'set_script_type_module' ), 99999 );
		} else {
			add_filter( 'script_loader_tag', array( $this, 'script_loader_tag' ), 99999, 3 );
		}
	}

	/**
	 * Enqueue AI Charlie assets on all MonsterInsights admin pages.
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		// Only load on MonsterInsights admin pages.
		if ( ! $this->is_monsterinsights_page() ) {
			return;
		}

		$this->load_manifest_data();
		$this->enqueue_script();

		// CSS is injected by Vite in dev mode, only enqueue in production.
		if ( ! $this->is_dev_mode() ) {
			$this->enqueue_styles();
		}
	}

	/**
	 * Check if current page is a MonsterInsights admin page.
	 *
	 * @return bool
	 */
	private function is_monsterinsights_page() {
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';

		// Only load on reports pages (Vue 2 and Vue 3).
		$allowed_pages = array(
			'monsterinsights_reports',          // Vue 2 reports
			'monsterinsights_overview_report',  // Vue 3 overview report
		);

		return in_array( $page, $allowed_pages, true );
	}

	/**
	 * Enqueue the AI Charlie script.
	 *
	 * @return void
	 */
	private function enqueue_script() {
		$script_url = $this->get_script_url();

		if ( empty( $script_url ) ) {
			return;
		}

		wp_register_script(
			self::SCRIPT_HANDLE,
			$script_url,
			array( 'wp-i18n' ),
			monsterinsights_get_asset_version(),
			true
		);

		wp_enqueue_script( self::SCRIPT_HANDLE );

		// Inject bearer token and AI chat config directly so it is available on ALL
		// MonsterInsights admin pages, including Vue 2 pages where the
		// monsterinsights_localize_script_data filter never fires.
		$bearer_token_data = MonsterInsights_API_Token::get_token( is_network_admin() );
		$bearer_token      = '';
		$bearer_expires    = 0;
		if ( ! is_wp_error( $bearer_token_data ) ) {
			$bearer_token   = $bearer_token_data['token'];
			$bearer_expires = $bearer_token_data['expires_at'];
		}

		$ai_chat_api_url = apply_filters( 'monsterinsights_ai_chat_api_url', 'https://ai-api.monsterinsights.com' );
		$version_path    = monsterinsights_is_pro_version() ? 'pro' : 'lite';
		$assets_url      = apply_filters( 'monsterinsights_vue3_assets_url', plugins_url( $version_path . '/assets/vue3', MONSTERINSIGHTS_PLUGIN_FILE ) );
		$wizard_url      = is_network_admin()
			? network_admin_url( 'index.php?page=monsterinsights-onboarding' )
			: admin_url( 'index.php?page=monsterinsights-onboarding' );
		$settings_url    = is_network_admin()
			? network_admin_url( 'admin.php?page=monsterinsights_network' )
			: admin_url( 'admin.php?page=monsterinsights_settings' );

		// Use ||= semantics so values set by wp_localize_script (Vue 3 pages) take precedence.
		$inline = sprintf(
			'window.monsterinsights=window.monsterinsights||{};' .
			'if(!window.monsterinsights.bearer_token){window.monsterinsights.bearer_token=%s;}' .
			'if(!window.monsterinsights.bearer_expires){window.monsterinsights.bearer_expires=%d;}' .
			'if(!window.monsterinsights.ai_chat_api_url){window.monsterinsights.ai_chat_api_url=%s;}' .
			'if(!window.monsterinsights.assets_url){window.monsterinsights.assets_url=%s;}' .
			'if(!window.monsterinsights.wizard_url){window.monsterinsights.wizard_url=%s;}' .
			'if(!window.monsterinsights.settings_url){window.monsterinsights.settings_url=%s;}',
			wp_json_encode( $bearer_token ),
			$bearer_expires,
			wp_json_encode( $ai_chat_api_url ),
			wp_json_encode( $assets_url ),
			wp_json_encode( $wizard_url ),
			wp_json_encode( $settings_url )
		);
		wp_add_inline_script( self::SCRIPT_HANDLE, $inline, 'before' );

		// Load translations.
		$text_domain = monsterinsights_is_pro_version() ? 'google-analytics-premium' : 'google-analytics-for-wordpress';
		wp_set_script_translations( self::SCRIPT_HANDLE, $text_domain );
	}

	/**
	 * Enqueue AI Charlie CSS.
	 *
	 * @return void
	 */
	private function enqueue_styles() {
		$entry_key = 'src/modules/ai-charlie/main.js';

		if ( empty( self::$manifest_data[ $entry_key ]['css'] ) ) {
			return;
		}

		$base_url = $this->get_base_url();

		foreach ( self::$manifest_data[ $entry_key ]['css'] as $index => $css_file ) {
			wp_enqueue_style(
				self::SCRIPT_HANDLE . '-style-' . $index,
				$base_url . ltrim( $css_file, '/' ),
				array(),
				monsterinsights_get_asset_version()
			);
		}
	}

	/**
	 * Get the script URL (dev or production).
	 *
	 * @return string
	 */
	private function get_script_url() {
		// Dev mode: Load from Vite dev server.
		if ( $this->is_dev_mode() ) {
			return trailingslashit( $this->get_dev_url() ) . 'src/modules/ai-charlie/main.js';
		}

		// Production: Load from manifest.
		$entry_key = 'src/modules/ai-charlie/main.js';

		if ( empty( self::$manifest_data[ $entry_key ]['file'] ) ) {
			return '';
		}

		$file = self::$manifest_data[ $entry_key ]['file'];

		// Use unminified version when SCRIPT_DEBUG is enabled.
		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$file = str_replace( '.min.js', '.js', $file );
		}

		return $this->get_base_url() . ltrim( $file, '/' );
	}

	/**
	 * Get config data for wp_localize_script.
	 *
	 * @return array
	 */
	/**
	 * Filter callback: merge AI chat config into the monsterinsights localize data.
	 *
	 * Hooked into 'monsterinsights_localize_script_data' so the AI chat API URL
	 * and bearer token are available on window.monsterinsights on every MI page.
	 *
	 * @param array $data The existing localize script data.
	 * @return array
	 */
	public function add_ai_chat_config( $data ) {
		$bearer_token_data = MonsterInsights_API_Token::get_token( is_network_admin() );
		$bearer_token      = '';
		$bearer_expires    = 0;
		if ( ! is_wp_error( $bearer_token_data ) ) {
			$bearer_token   = $bearer_token_data['token'];
			$bearer_expires = $bearer_token_data['expires_at'];
		}

		$data['ai_chat_api_url'] = apply_filters( 'monsterinsights_ai_chat_api_url', 'https://ai-api.monsterinsights.com' );
		$data['bearer_token']    = $bearer_token;
		$data['bearer_expires']  = $bearer_expires;

		return $data;
	}

	/**
	 * Check if Vue 3 dev mode is enabled.
	 *
	 * @return bool
	 */
	private function is_dev_mode() {
		return defined( 'MONSTERINSIGHTS_V3_DEV_URL' ) && MONSTERINSIGHTS_V3_DEV_URL;
	}

	/**
	 * Get dev server URL.
	 *
	 * @return string
	 */
	private function get_dev_url() {
		return defined( 'MONSTERINSIGHTS_V3_DEV_URL' ) ? MONSTERINSIGHTS_V3_DEV_URL : '';
	}

	/**
	 * Get base URL for production assets.
	 *
	 * @return string
	 */
	private function get_base_url() {
		return plugins_url( $this->version_path . '/assets/vue3/', MONSTERINSIGHTS_PLUGIN_FILE );
	}

	/**
	 * Load Vue 3 manifest data.
	 *
	 * @return void
	 */
	private function load_manifest_data() {
		if ( self::$manifest_data !== null ) {
			return;
		}

		$plugin_path   = plugin_dir_path( MONSTERINSIGHTS_PLUGIN_FILE );
		$manifest_path = $plugin_path . $this->version_path . '/assets/vue3/manifest.json';

		if ( ! file_exists( $manifest_path ) ) {
			self::$manifest_data = array();
			return;
		}

		$contents            = file_get_contents( $manifest_path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		self::$manifest_data = json_decode( $contents, true );

		if ( ! is_array( self::$manifest_data ) ) {
			self::$manifest_data = array();
		}
	}

	/**
	 * Set script type to module (WP 6.4+).
	 *
	 * @param array $attrs Script attributes.
	 * @return array
	 */
	public function set_script_type_module( $attrs ) {
		if ( isset( $attrs['id'] ) && str_replace( '-js', '', $attrs['id'] ) === self::SCRIPT_HANDLE ) {
			$attrs['type'] = 'module';
		}
		return $attrs;
	}

	/**
	 * Set script type to module (WP < 6.4).
	 *
	 * @param string $tag    Script tag.
	 * @param string $handle Script handle.
	 * @param string $src    Script URL.
	 * @return string
	 */
	public function script_loader_tag( $tag, $handle, $src ) {
		if ( $handle !== self::SCRIPT_HANDLE ) {
			return $tag;
		}

		return str_replace( '></script>', ' type="module"></script>', $tag );
	}
}

new MonsterInsights_AI_Charlie_Assets();
