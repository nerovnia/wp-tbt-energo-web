<?php

/**
 * Plugin bootstrap file
 *
 * @heateor-open-graph-meta-tags
 * Plugin Name:       Open Graph Meta Tags by Heateor
 * Plugin URI:        https://www.heateor.com
 * Description:       Optimizes social sharing by inserting Facebook Open Graph, GooglePlus/Schema.org and Twitter Card Tags in HTML source code of your WordPress Website. 
 * Version:           1.1.12
 * Author:            Team Heateor
 * Author URI:        https://www.heateor.com
 * Text Domain:       heateor-open-graph-meta-tags
 * Domain Path:       /languages
 */

defined( 'ABSPATH' ) or die( "Cheating........Uh!!" );

// If this file is called directly, halt.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'HEATEOR_OGMT_VERSION', '1.1.12' );

// plugin core class object
$heateor_ogmt = null;

/**
 * Save default options
 */
function heateor_ogmt_save_default_options() {

	// default options
	add_option( 'heateor_ogmt', array(
	   'delete_options' => '1',
	   'trailing_slash' => '1',
	   'canonical_url' => '1',
	   'meta_description_tag' => '1',
	   'description_max_length' => '300',
	   'homepage_description' => 'tagline',
	   'default_image' => '',
	   'image_tag_featured' => '1',
	   'image_tag_first' => '1',
	   'image_tag_gallery' => '1',
	   'image_tag_default' => '1',
	   'enable_fb_locale' => '1',
	   'fb_locale' => get_locale(),
	   'enable_fb_site_name' => '1',
	   'enable_fb_title' => '1',
	   'enable_fb_url' => '1',
	   'enable_fb_type' => '1',
	   'fb_homepage_type' => 'website',
	   'fb_facebook_page' => '',
	   'enable_fb_description' => '1',
	   'enable_fb_image' => '1',
	   'enable_fb_cache_clearer' => '1',
	   'enable_twitter_title' => '1',
	   'enable_twitter_url' => '1',
	   'enable_twitter_website_username' => '1',
	   'twitter_username' => '',
	   'enable_twitter_creator' => '1',
	   'enable_twitter_description' => '1',
	   'enable_twitter_image' => '1',
	   'enable_twitter_image' => '1',
	   'twitter_card_type' => 'summary_large_image',
	   'enable_google_itemprop' => '1',
	   'google_page' => '',
	   'enable_google_author' => '1',
	   'enable_google_description' => '1',
	   'enable_google_image' => '1',
	) );

	// plugin version
	add_option( 'heateor_ogmt_version', HEATEOR_OGMT_VERSION );

}

/**
 * Plugin activation function
 */
function heateor_ogmt_activate_plugin( $network_wide ) {

	global $wpdb;

	if ( function_exists( 'is_multisite' ) && is_multisite() ) {
		if ( $network_wide ) {
			$old_blog =  $wpdb->blogid;
			//Get all blog ids
			$blog_ids =  $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" );

			foreach ( $blog_ids as $blog_id ) {
				switch_to_blog( $blog_id );
				heateor_ogmt_save_default_options();
			}
			switch_to_blog( $old_blog );
			return;
		}
	}
	heateor_ogmt_save_default_options();

}

register_activation_hook( __FILE__, 'heateor_ogmt_activate_plugin' );

/**
 * The core plugin class
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-heateor-open-graph-meta-tags.php';

/**
 * Begins execution of the plugin.
 *
 * @since    1.0
 */
function heateor_ogmt_run() {

	global $heateor_ogmt;
	$heateor_ogmt = new Heateor_Open_Graph_Meta_Tags( HEATEOR_OGMT_VERSION );

}

heateor_ogmt_run();