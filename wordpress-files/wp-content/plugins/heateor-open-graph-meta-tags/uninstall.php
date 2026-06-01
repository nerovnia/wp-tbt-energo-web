<?php

/**
 * Fired when the plugin is deleted.
 *
 * Works in single as well as in Multisite/Network installs.
 *
 * @since    1.0
 */

defined( 'ABSPATH' ) or die( "Cheating........Uh!!" );

//if uninstall not called from WordPress, exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

// check if current user is eligible to perform uninstall
if ( ! current_user_can( 'activate_plugins' ) ) {
	return;
}

$heateor_ogmt_options = get_option( 'heateor_ogmt' );
$heateor_ogmt_option_to_delete = 'heateor_ogmt';

if ( isset( $heateor_ogmt_options['delete_options'] ) ) {
	global $wpdb;
	
	// For Multisite
	if ( function_exists( 'is_multisite' ) && is_multisite() ) {
		$heateor_ogmt_blog_ids = heateor_ogmt_get_blog_ids();
		$heateor_ogmt_original_blog_id = get_current_blog_id();
		foreach ( $heateor_ogmt_blog_ids as $blog_id ) {
			switch_to_blog( $blog_id );
			delete_site_option( $heateor_ogmt_option_to_delete );
			$wpdb->query( "DELETE FROM $wpdb->postmeta WHERE meta_key LIKE '_heateor_ogmt%'" );
		}
		switch_to_blog( $heateor_ogmt_original_blog_id );    // should use "restore_current_blog"?
	} else {
		delete_option( $heateor_ogmt_option_to_delete );
		$wpdb->query( "DELETE FROM $wpdb->postmeta WHERE meta_key LIKE '_heateor_ogmt%'" );
	}
}

/**
 * Get all blog IDs of blogs in the current network that are not:
 * archived, spam, deleted
 *
 * @since    1.0
 * @return   array|boolean    The blog IDs, (bool) FALSE if: no matches.
 */
function heateor_ogmt_get_blog_ids() {
	global $wpdb;

	$sql = <<<SQL
SELECT blog_id
FROM {$wpdb->blogs}
WHERE archived = '0'
AND spam = '0'
AND deleted = '0'
SQL;

	return $wpdb->get_col( esc_sql( $sql ) );
}
