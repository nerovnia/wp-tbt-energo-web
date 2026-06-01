<?php

/**
 * Contains functions responsible for functionality at admin side
 *
 * @since      1.0
 *
 */

/**
 * This class defines all code necessary for functionality at admin side
 *
 * @since      1.0
 *
 */
class Heateor_Open_Graph_Meta_Tags_Admin {

	/**
	 * Options saved in database.
	 *
	 * @since    1.0
	 */
	private $options;

	/**
	 * Current version of the plugin.
	 *
	 * @since    1.0
	 */
	private $version;

	/**
	 * Get saved options.
	 *
	 * @since    1.0
     * @param    array    $options    Plugin options saved in database
	 */
	public function __construct( $options, $version ) {

		$this->options = $options;
		$this->version = $version;

	}

	/**
	 * Creates plugin menu in admin area
	 *
	 * @since    1.0
	 */
	public function create_admin_menu() {

		$page = add_menu_page( __( 'Open Graph Meta Tags by Heateor', 'heateor-open-graph-meta-tags' ), 'Open Graph Meta Tags', 'manage_options', 'heateor-ogmt-options', array( $this, 'options_page' ), plugins_url( '../images/logo.png', __FILE__ ) );
		// options
		$options_page = add_submenu_page( 'heateor-ogmt-options', __( "Open Graph Meta Tags Options", 'heateor-open-graph-meta-tags' ), __( "Open Graph Meta Tags", 'heateor-open-graph-meta-tags' ), 'manage_options', 'heateor-ogmt-options', array( $this, 'options_page' ) );
		add_action( 'admin_print_scripts-' . $options_page, array( $this, 'admin_scripts' ) );
		add_action( 'admin_print_scripts-' . $options_page, array( $this, 'fb_sdk_script' ) );
		add_action( 'admin_print_styles-' . $options_page, array( $this, 'admin_style' ) );
		add_action( 'admin_print_scripts-' . $options_page, array( $this, 'admin_options_scripts' ) );
	
	}

	/**
	 * Register plugin settings and its sanitization callback.
	 *
	 * @since    1.0
	 */
	public function options_init() {

		register_setting( 'heateor_ogmt_options', 'heateor_ogmt', array( $this, 'validate_options' ) );
		
		// show option to disable sharing on particular page/post
		$post_types = get_post_types( array( 'public' => true ), 'names', 'and' );
		$post_types = array_unique( array_merge( $post_types, array( 'post', 'page' ) ) );
		foreach ( $post_types as $type ) {
			add_meta_box( 'heateor_ogmt_meta', 'Open Graph Meta Tags', array( $this, 'custom_meta_setup' ), $type );
		}
		// save sharing meta on post/page save
		add_action( 'save_post', array( $this, 'save_custom_meta' ) );

	}

	/**
	 * Show sharing meta options
	 *
	 * @since    1.0
	 */
	public function custom_meta_setup() {

		global $post;
		$postType = $post->post_type;
		$og_meta = get_post_meta( $post->ID, '_heateor_ogmt_meta', true );
		?>
		<p>
			<label for="heateor_ogmt_meta">
				<input type="checkbox" name="_heateor_ogmt_meta[disable_tags]" id="heateor_ogmt_meta" value="1" <?php echo is_array( $og_meta ) && isset( $og_meta['disable_tags'] ) && $og_meta['disable_tags'] == '1' ? 'checked' : ''; ?> />
				<?php _e( 'Disable Meta Tags on this ' . $postType, 'heateor-open-graph-meta-tags' ) ?>
			</label>
		</p>
		<?php
	    echo '<input type="hidden" name="heateor_ogmt_meta_nonce" value="' . wp_create_nonce( __FILE__ ) . '" />';
	
	}

	/**
	 * Save custom meta fields
	 *
	 * @since    1.0
	 */
	public function save_custom_meta( $post_id ) {
	    
	    // if this is an autosave, do nothing
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || empty( $_POST['post_type'] ) ) {
			return $post_id;
		}

	    // make sure data came from our meta box
	    if ( ! isset( $_POST['heateor_ogmt_meta_nonce'] ) || ! wp_verify_nonce( $_POST['heateor_ogmt_meta_nonce'], __FILE__ ) ) {
			return $post_id;
	 	}
	    // check user permissions
	    if ( $_POST['post_type'] == 'page' ) {
	        if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return $post_id;
	    	}
		} else {
	        if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return $post_id;
	    	}
		}
		$new_config = array();
	    if ( isset( $_POST['_heateor_ogmt_meta'] ) && isset( $_POST['_heateor_ogmt_meta']['disable_tags'] ) ) {
			$new_config['disable_tags'] = '1';
		}
		update_post_meta( $post_id, '_heateor_ogmt_meta', $new_config );
	    
	    return $post_id;

	}

	/** 
	 * Sanitization callback for plugin options.
	 *
	 * IMPROVEMENT: complexity can be reduced (this function is called on each option page validation and "if ( $k == 'providers' ) {"
	 * condition is being checked every time)
     * @since    1.0
	 */ 
	public function validate_options( $heateorOgmtOptions ) {
		
		foreach ( $heateorOgmtOptions as $k => $v ) {
			if ( is_string( $v ) ) {
				$heateorOgmtOptions[$k] = esc_attr( trim( $v ) );
			}
		}
		return $heateorOgmtOptions;

	}

	/**
	 * Include Javascript at plugin options page in admin area.
	 *
	 * @since    1.0
	 */	
	public function admin_options_scripts() {

		wp_enqueue_script( 'thickbox' );
		wp_enqueue_style( 'thickbox' );
		wp_enqueue_script( 'heateor_ogmt_admin_options_script', plugins_url( 'js/heateor-open-graph-meta-tags-options.js', __FILE__ ), array( 'jquery', 'jquery-ui-sortable' ), $this->version );
	
	}

	/**
	 * Include Javascript SDK in admin.
	 *
	 * @since    1.0
	 */	
	public function fb_sdk_script() {

		wp_enqueue_script( 'heateor_ogmt_fb_sdk_script', plugins_url( 'js/heateor-open-graph-meta-tags-fb-sdk.js', __FILE__ ), false, $this->version );
	
	}

	/**
	 * Include CSS files in admin.
	 *
	 * @since    1.0
	 */	
	public function admin_style() {

		wp_enqueue_style( 'heateor_ogmt_admin_style', plugins_url( 'css/heateor-open-graph-meta-tags-admin.css', __FILE__ ), false, $this->version );
	
	}

	/**
	 * Include javascript files in admin.
	 *
	 * @since    1.0
	 */	
	public function admin_scripts() {
		
		?>
		<script type="text/javascript">var heateorOgmtWebsiteUrl = '<?php echo site_url() ?>', heateorOgmtHelpBubbleTitle = "<?php echo __( 'Click to toggle help', 'heateor-open-graph-meta-tags' ) ?>", heateorOgmtSharingAjaxUrl = '<?php echo get_admin_url() ?>admin-ajax.php';</script>
		<?php
		wp_enqueue_script( 'heateor_ogmt_admin_script', plugins_url( 'js/heateor-open-graph-meta-tags-admin.js', __FILE__ ), array( 'jquery', 'jquery-ui-tabs' ), $this->version );
	
	}

	/**
	 * Renders options page
	 *
	 * @since    1.0
	 */
	public function options_page() {

		// message on saving options
		echo $this->settings_saved_notification();
		$options = $this->options;
		/**
		 * The file rendering options page
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/heateor-open-graph-meta-tags-options-page.php';
	
	}

	/**
	 * Display notification message when plugin options are saved
	 *
	 * @since    1.0
     * @return   string    Notification after saving options
	 */
	private function settings_saved_notification() {

		if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] == 'true' ) {
			return '<div id="setting-error-settings_updated" class="updated settings-error notice is-dismissible below-h2"> 
	<p><strong>' . __( 'Settings saved', 'heateor-open-graph-meta-tags' ) . '</strong></p><button type="button" class="notice-dismiss"><span class="screen-reader-text">' . __( 'Dismiss this notice', 'heateor-open-graph-meta-tags' ) . '</span></button></div>';
		}
	
	}

	/**
	 * If Yoast SEO plugin is active
	 *
	 * @since    1.0
	 */
	public function is_yoast_seo_active() {

		if ( defined( 'WPSEO_VERSION' ) ) {
			return true;
		}

		return false;

	}

	/**
	 * Check if WooCommerce is active
	 *
	 * @since    1.0
	 */
	public function is_woocommerce_active() {
		
		return in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) );
	
	}

	/**
	 * Check if Subheading plugin is active
	 *
	 * @since    1.0
	 */
	public function is_subheading_plugin_active() {

		if ( class_exists( 'SubHeading' ) && function_exists( 'get_the_subheading' ) ) {
			return true;
		}
		
		return false;
	
	}

	/**
	 * Check if Business Directory plugin is active
	 *
	 * @since    1.0
	 */
	public function is_business_directory_active() {

		if ( is_plugin_active( 'business-directory-plugin/wpbusdirman.php' ) ) {
			return true;
		}
		
		return false;
	
	}

	/**
	 * Add a settings link to the Plugins page, so people can go straight from the plugin page to the settings page
	 *
	 * @since    1.0
	 */
	public function place_settings_link( $links ) {
		
		$settings_link = '<a href="admin.php?page=heateor-ogmt-options">' . __( 'Settings', 'heateor-open-graph-meta-tags' ) . '</a>';
		$support_link = '<a href="http://support.heateor.com" target="_blank">' . __('Support Documentation', 'heateor-open-graph-meta-tags') . '</a>';
		$addons_link = '<br/><a href="https://www.heateor.com/add-ons" target="_blank">' . __( 'Add-Ons', 'heateor-open-graph-meta-tags' ) . '</a>';
		// place it before other links
		array_unshift( $links, $settings_link );
		$links[] = $addons_link;
		$links[] = $support_link;

		return $links;

	}

	/**
	 * Try to clear Facebook open graph cache
	 *
	 * @since    1.0
	 */
	public function clear_facebook_og_cache( $post_id ) {
		
		$save = true;

		// if this is an autosave, do nothing
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || empty( $_POST['post_type'] ) ) {
			return $post_id;
		}

		// if the post is not publicly_queryable (or a page) this doesn't make sense
		$post_type = get_post_type_object( get_post_type( $post_id ) );
		if ( ! ( $post_type->publicly_queryable || $post_type->name == 'page' ) ) {
			// not publicly_queryable (or page), return
			return $post_id;
		}

		// check the user's permissions
		if ( 'page' == $_POST['post_type'] ) {
			if ( ! current_user_can( 'edit_page', $post_id ) )
				$save = false;
		} else {
			if ( ! current_user_can( 'edit_post', $post_id ) )
				$save = false;
		}

		$fb_debugger_url = 'http://graph.facebook.com/?id=' . urlencode( get_permalink( $post_id ) ) . '&scrape=true&method=post';
		$response = wp_remote_get( $fb_debugger_url );
		if ( ! is_wp_error( $response ) ) {
			if ( $response['response']['code'] == 200 ) {
				$_SESSION['heateor_fb_og_cache_cleared'] = 1;
			}
		}

	}

	/**
	 * Show notification in admin area, if Facebook Open Graph cache gets cleared successfully
	 *
	 * @since    1.0
	 */
	public function fb_og_cache_cleared_notification() {
		
		if ( $screen = get_current_screen() ) {
			if ( isset( $_SESSION['heateor_fb_og_cache_cleared'] ) && $_SESSION['heateor_fb_og_cache_cleared'] == 1 && $screen->parent_base == 'edit' && $screen->base == 'post' ) {
				global $post;
				?>
				<div class="updated">
					<p><?php _e( 'Facebook Open Graph Meta Tags cache purged', 'heateor-open-graph-meta-tags' ); ?> <a target="_blank" href="http://www.facebook.com/sharer.php?u=<?php echo urlencode( get_permalink( $post->ID ) ); ?>" ><?php _e( 'Try sharing this on Facebook', 'heateor-open-graph-meta-tags' ); ?></a></p>
				</div>
				<?php
			}
		}
		if ( isset( $_SESSION['heateor_fb_og_cache_cleared'] ) ) {
			unset( $_SESSION['heateor_fb_og_cache_cleared'] );
		}
		
	}

	/**
	 * Show custom options
	 *
	 * @since    1.0
	 */
	public function show_custom_options( $user ) {
		
		global $user_ID;
		
		if ( current_user_can( 'publish_posts' ) || current_user_can( 'publish_pages' ) ) {
			$facebook_profile_url = get_the_author_meta( 'heateor_ogmt_author_facebook', $user_ID );
			$gp_profile_url = get_the_author_meta( 'heateor_ogmt_author_googleplus', $user_ID );
			$twitter_username = get_the_author_meta( 'heateor_ogmt_author_twitter', $user_ID );
			?>
			<h3>Heateor Open Graph Meta Tags</h3>
			<table class="form-table">
		        <tr>
		            <th><label for="heateor_ogmt_fb_profile"><?php _e( 'Facebook Profile Url', 'heateor-open-graph-meta-tags' ) ?></label></th>
		            <td><input id="heateor_ogmt_fb_profile" type="text" name="heateor_ogmt_fb_profile" value="<?php echo $facebook_profile_url ? esc_attr( $facebook_profile_url ) : ''; ?>" class="regular-text" /></td>
		        </tr>
		        <tr>
		            <th><label for="heateor_ogmt_gp_profile"><?php _e( 'Google Plus Profile Url', 'heateor-open-graph-meta-tags' ) ?></label></th>
		            <td><input id="heateor_ogmt_gp_profile" type="text" name="heateor_ogmt_gp_profile" value="<?php echo $gp_profile_url ? esc_attr( $gp_profile_url ) : ''; ?>" class="regular-text" /></td>
		        </tr>
		        <tr>
		            <th><label for="heateor_ogmt_twitter_username"><?php _e( 'Twitter Username (Without @)', 'heateor-open-graph-meta-tags' ) ?></label></th>
		            <td><input id="heateor_ogmt_twitter_username" type="text" name="heateor_ogmt_twitter_username" value="<?php echo $twitter_username ? esc_attr( $twitter_username ) : ''; ?>" class="regular-text" /></td>
		        </tr>
		    </table>
			<?php
		}
	}

	/**
	 * Check if url is in valid format
	 *
	 * @since    1.1.9
	 */
	private function validate_url( $url ) {

		return filter_var( trim( $url ), FILTER_VALIDATE_URL );
	
	}

	/**
	 * Save custom options
	 *
	 * @since    1.0
	 */
	public function save_custom_options( $user_id ) { 	
	 	
	 	if ( ! current_user_can( 'edit_user', $user_id ) ) {
	 		return false;
	 	}
	 	if ( isset( $_POST['heateor_ogmt_fb_profile'] ) && $this->validate_url( trim( $_POST['heateor_ogmt_fb_profile'] ) ) ) {
	 		update_user_meta( $user_id, 'heateor_ogmt_author_facebook', esc_url( trim( $_POST['heateor_ogmt_fb_profile'] ) ) );
	 	}
	 	if ( isset( $_POST['heateor_ogmt_gp_profile'] ) && $this->validate_url( trim( $_POST['heateor_ogmt_gp_profile'] ) ) ) {
	 		update_user_meta( $user_id, 'heateor_ogmt_author_googleplus', esc_url( trim( $_POST['heateor_ogmt_gp_profile'] ) ) );
	 	}
		if ( isset( $_POST['heateor_ogmt_twitter_username'] ) ) {
			update_user_meta( $user_id, 'heateor_ogmt_author_twitter', sanitize_text_field( $_POST['heateor_ogmt_twitter_username'] ) );
		}
	
	}

	/**
	 * Replicate the options to the new blog created
	 *
	 * @since    1.1.5
	 */
	public function replicate_settings( $blog_id ) {

		add_blog_option( $blog_id, 'heateor_ogmt', $this->options );
	
	}

}
