<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @since      1.0
 *
 */

/**
 * The core plugin class.
 *
 * This is used to define hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0
 */
class Heateor_Open_Graph_Meta_Tags {

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0
	 */
	protected $plugin_slug;

	/**
	 * Current version of the plugin.
	 *
	 * @since    1.0
	 */
	protected $version;

	/**
	 * Options saved in database.
	 *
	 * @since    1.0
	 */
	public $options;

	/**
	 * Member to assign object of Heateor_Open_Graph_Meta_Tags_Public Class.
	 *
	 * @since    1.0
	 */
	public $plugin_public;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * @since    1.0
	 */
	public function __construct( $version ) {

		$this->plugin_slug = 'heateor-open-graph-meta-tags';
		$this->version = $version;
		$this->options = get_option( 'heateor_ogmt' );

		$this->load_dependencies();
		$this->set_locale();
		$this->call_admin_hooks();
		$this->call_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * @since    1.0
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for defining all functions for the functionality that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-heateor-open-graph-meta-tags-admin.php';

		/**
		 * The class responsible for defining all functions for the functionality that occur at front-end of website.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-heateor-open-graph-meta-tags-public.php';

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * @since    1.0
	 */
	private function set_locale() {

		load_plugin_textdomain( 'heateor-open-graph-meta-tags', false, plugin_dir_path( dirname( __FILE__ ) ) . '/languages/' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality of the plugin.
	 *
	 * @since    1.0
	 */
	private function call_admin_hooks() {

		// create object of admin class to pass options
		$plugin_admin = new Heateor_Open_Graph_Meta_Tags_Admin( $this->options, $this->version );
		
		// create admin menu
		add_action( 'admin_menu', array( $plugin_admin, 'create_admin_menu' ) );
		// set sanitization callback for plugin options
		add_action( 'admin_init', array( $plugin_admin, 'options_init' ) );
		// add a "Settings" link to the Plugins page
		add_filter( 'plugin_action_links_heateor-open-graph-meta-tags/heateor-open-graph-meta-tags.php', array( $plugin_admin, 'place_settings_link' ) );
		if ( isset( $this->options['enable_fb_cache_clearer'] ) ) {
			// try to clear Facebook open graph cache 
			add_action( 'save_post', array( $plugin_admin, 'clear_facebook_og_cache' ) );
			// show notification in admin area, if Facebook Open Graph cache gets cleared successfully
			add_action( 'admin_notices', array( $plugin_admin, 'fb_og_cache_cleared_notification' ) );
		}
		// show custom options at author's profile page
		add_action( 'edit_user_profile', array( $plugin_admin, 'show_custom_options' ) );
		add_action( 'show_user_profile', array( $plugin_admin, 'show_custom_options' ) );
		// save custom options
		add_action( 'personal_options_update', array( $plugin_admin, 'save_custom_options' ) );
		add_action( 'edit_user_profile_update', array( $plugin_admin, 'save_custom_options' ) );
		// if multisite is enabled and this is the main website
		if ( is_multisite() && is_main_site() ) {
			// replicate the options to the new blog created
			add_action( 'wpmu_new_blog', array( $plugin_admin, 'replicate_settings' ) );
		}

	}

	/**
	 * Register all of the hooks related to the front-end functionality of the plugin.
	 *
	 * @since    1.0
	 */
	private function call_public_hooks() {

		// create object of public class to pass options
		$plugin_public = new Heateor_Open_Graph_Meta_Tags_Public( $this->options, $this->version );
		$this->plugin_public = $plugin_public;

		// hook to upate plugin db/options based on version
		add_action( 'plugins_loaded', array( $plugin_public, 'update_db_check' ) );
		// hook to upate plugin db/options based on version
		add_action( 'wp_head', array( $plugin_public, 'insert_meta_tags' ), 99999 );
		// hook to add Open Graph Namespace
		add_filter( 'language_attributes', array( $plugin_public, 'add_open_graph_namespace' ), 99999 );
		// hook to add option for excerpt for pages
		add_action( 'init', array( $plugin_public, 'add_excerpts_to_pages' ) );

	}

	/**
	 * Returns the plugin slug
	 *
	 * @since     1.0
	 * @return    string    The plugin slug.
	 */
	public function get_plugin_slug() {

		return $this->plugin_slug;
	
	}

	/**
	 * Retrieve the version number of the plugin
	 *
	 * @since     1.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {

		return $this->version;
	
	}

}
