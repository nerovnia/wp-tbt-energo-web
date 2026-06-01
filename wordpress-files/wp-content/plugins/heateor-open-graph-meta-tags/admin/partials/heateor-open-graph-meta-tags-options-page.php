<?php

/**
 * Options page
 *
 * @since    1.0
 */
defined( 'ABSPATH' ) or die( "Cheating........Uh!!" );

$third_party_plugins = false;

if ( $this->is_yoast_seo_active() || $this->is_woocommerce_active() || $this->is_subheading_plugin_active() || $this->is_business_directory_active() ) {
	$third_party_plugins = true;
}
?>

<div id="fb-root"></div>

<h1>Open Graph Meta Tags</h1>

<div class="metabox-holder columns-2" id="post-body">
		<div class="menu_div" id="tabs">
			<form id="heateor_ogmt_form" action="options.php" method="post">
			<?php settings_fields( 'heateor_ogmt_options' ); ?>
			<h2 class="nav-tab-wrapper" style="height:34px">
			<ul>
				<li style="margin-left:9px"><a style="margin:0; height:23px" class="nav-tab" href="#tabs-1"><?php _e( 'General Options', 'heateor-open-graph-meta-tags' ) ?></a></li>
				<li style="margin-left:9px"><a style="margin:0; height:23px" class="nav-tab" href="#tabs-2"><?php _e( 'Facebook Open Graph', 'heateor-open-graph-meta-tags' ) ?></a></li>
				<li style="margin-left:9px"><a style="margin:0; height:23px" class="nav-tab" href="#tabs-3"><?php _e( 'Twitter Cards', 'heateor-open-graph-meta-tags' ) ?></a></li>
				<li style="margin-left:9px"><a style="margin:0; height:23px" class="nav-tab" href="#tabs-4"><?php _e( 'Google/Schema', 'heateor-open-graph-meta-tags' ) ?></a></li>
				<?php if ( $third_party_plugins ) { ?>
					<li style="margin-left:9px"><a style="margin:0; height:23px" class="nav-tab" href="#tabs-5"><?php _e( '3rd Party Integration', 'heateor-open-graph-meta-tags' ) ?></a></li>
				<?php } ?>
				<li style="margin-left:9px"><a style="margin:0; height:23px" class="nav-tab" href="#tabs-6"><?php _e( 'Troubleshooter', 'heateor-open-graph-meta-tags' ) ?></a></li>
			</ul>
			</h2>
			
			<div class="menu_containt_div" id="tabs-1">
				<div class="clear"></div>
				<div class="heateor_ogmt_left_column">
					<div class="stuffbox">
						<h3><label><?php _e( 'Miscellaneous', 'heateor-open-graph-meta-tags' );?></label></h3>
						<div class="inside">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
								<tr>
									<th>
									<img id="heateor_ogmt_delete_options_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_delete_options"><?php _e( "Delete all the options on plugin deletion", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_delete_options" name="heateor_ogmt[delete_options]" type="checkbox" <?php echo isset( $options['delete_options'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_delete_options_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'If enabled, plugin options will get deleted when plugin is deleted/uninstalled and you will need to reconfigure the options when you install the plugin next time', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>
							</table>
						</div>	
					</div>

					<div class="stuffbox">
						<h3><label><?php _e( 'Meta Tags', 'heateor-open-graph-meta-tags' );?></label></h3>
						<div class="inside">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
								<tr>
									<th>
									<img id="heateor_ogmt_meta_trailing_slash_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_meta_trailing_slash"><?php _e( "Add trailing slash at the end of homepage url", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_meta_trailing_slash" name="heateor_ogmt[trailing_slash]" type="checkbox" <?php echo isset( $options['trailing_slash'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_meta_trailing_slash_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'If enabled, trailing slash will be appended to homepage url in og:url tag at homepage', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_meta_canonical_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_meta_canonical"><?php _e( "Set Canonical URL", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_meta_canonical" name="heateor_ogmt[canonical_url]" type="checkbox" <?php echo isset( $options['canonical_url'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_meta_canonical_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;link rel="canonical" href="..."/&gt;', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_meta_author_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_meta_author"><?php _e( "Include Author Meta tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_meta_author" name="heateor_ogmt[author_meta]" type="checkbox" <?php echo isset( $options['author_meta'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_meta_author_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;meta name="author" content="..."/&gt; Sets the author name for the article', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_hide_author_tags_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_hide_author_tags"><?php _e( "Hide author tags on pages", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_hide_author_tags" name="heateor_ogmt[hide_author_pages]" type="checkbox" <?php echo isset( $options['hide_author_pages'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_meta_description_tag_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_meta_description_tag"><?php _e( "Include Meta Description tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_meta_description_tag" name="heateor_ogmt[meta_description_tag]" type="checkbox" <?php echo isset( $options['meta_description_tag'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_meta_description_tag_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;meta name="description" content="..."/&gt; Good for SEO if no other plugin is setting it already', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_meta_description_max_length_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_meta_description_max_length"><?php _e( "Maximum length of meta description", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_meta_description_max_length" name="heateor_ogmt[description_max_length]" type="text" value="<?php echo $options['description_max_length']; ?>" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_meta_description_max_length_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Keep blank for no maximum length', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_home_meta_description_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_home_meta_description"><?php _e( "Homepage description", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<select id="heateor_ogmt_home_meta_description" name="heateor_ogmt[homepage_description]">
										<option value="tagline" <?php echo $options['homepage_description'] == 'tagline' ? 'selected' : ''; ?> >Website Tagline</option>
										<option value="custom" <?php echo $options['homepage_description'] == 'custom' ? 'selected' : ''; ?> >Custom text</option>
									</select><br/>
									<textarea <?php echo $options['homepage_description'] != 'custom' ? 'style="display:none"' : ''; ?> id="heateor_ogmt_home_description_custom" rows="4" cols="40" name="heateor_ogmt[homepage_description_custom]"><?php echo $options['homepage_description_custom'] ?></textarea>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_default_image_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_default_image"><?php _e( "Default image for image meta tags", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input type="text" name="heateor_ogmt[default_image]" value="<?php echo $options['default_image']; ?>" id="heateor_ogmt_default_image" /><br/>
									<input id="heateor_ogmt_default_image_upload" class="button" type="button" value="<?php _e( 'Upload/Choose image', 'heateor-open-graph-meta-tags' ) ?>" />
									<br/>
									<small>
										<?php _e( 'Full URL with http://', 'heateor-open-graph-meta-tags' ); ?>
										<br/>
										<?php _e( 'Recommended size: 1200x630px', 'heateor-open-graph-meta-tags' ); ?>
									</small>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_post_image_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label><?php _e( "Priority order for Image meta tag value for posts/pages", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									1) <input id="heateor_ogmt_og_image_featured" name="heateor_ogmt[image_tag_featured]" type="checkbox" <?php echo isset( $options['image_tag_featured'] ) ? 'checked = "checked"' : '';?> value="1" /><label for="heateor_ogmt_og_image_featured"><?php _e( "Use featured image of the post", 'heateor-open-graph-meta-tags' ); ?></label><br/>
									2) <input id="heateor_ogmt_og_image_first" name="heateor_ogmt[image_tag_first]" type="checkbox" <?php echo isset( $options['image_tag_first'] ) ? 'checked = "checked"' : '';?> value="1" /><label for="heateor_ogmt_og_image_first"><?php _e( "Use the first image from the post/page content", 'heateor-open-graph-meta-tags' ); ?></label><br/>
									3) <input id="heateor_ogmt_og_image_gallery" name="heateor_ogmt[image_tag_gallery]" type="checkbox" <?php echo isset( $options['image_tag_gallery'] ) ? 'checked = "checked"' : '';?> value="1" /><label for="heateor_ogmt_og_image_gallery"><?php _e( "Use first image from the post/page media gallery", 'heateor-open-graph-meta-tags' ); ?></label><br/>
									4) <input id="heateor_ogmt_og_image_default" name="heateor_ogmt[image_tag_default]" type="checkbox" <?php echo isset( $options['image_tag_default'] ) ? 'checked = "checked"' : '';?> value="1" /><label for="heateor_ogmt_og_image_default"><?php _e( "Use the default image specified above", 'heateor-open-graph-meta-tags' ); ?></label><br/>
									</td>
								</tr>
							</table>
						</div>	
					</div>
				</div>
				<?php include 'heateor-open-graph-meta-tags-about.php'; ?>
			</div>

			<div class="menu_containt_div" id="tabs-2">
				<div class="clear"></div>
				<div class="heateor_ogmt_left_column">
					<div class="stuffbox">
						<h3><label><?php _e( 'Facebook Open Graph Meta Tags', 'heateor-open-graph-meta-tags' );?></label></h3>
						<div class="inside">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
								<tr>
									<th>
										<label><?php _e( "Choose which meta tags to include:", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_locale_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_locale"><?php _e( "Locale tag", 'heateor-open-graph-meta-tags' ); ?> (fb:locale)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_locale" name="heateor_ogmt[enable_fb_locale]" type="checkbox" <?php echo isset( $options['enable_fb_locale'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr id="heateor_ogmt_enable_fb_locale_row" <?php echo ! isset( $options['enable_fb_locale'] ) ? 'style="display:none"' : '' ?> >
									<th>
									<img id="heateor_ogmt_fb_locale_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_fb_locale"><?php _e( "Locale", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_fb_locale" name="heateor_ogmt[fb_locale]" type="text" value="<?php echo $options['fb_locale']; ?>" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_site_name_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_site_name"><?php _e( "Site Name tag", 'heateor-open-graph-meta-tags' ); ?> (og:site_name)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_site_name" name="heateor_ogmt[enable_fb_site_name]" type="checkbox" <?php echo isset( $options['enable_fb_site_name'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_title_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_title"><?php _e( "Post/Page title tag", 'heateor-open-graph-meta-tags' ); ?> (og:title)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_title" name="heateor_ogmt[enable_fb_title]" type="checkbox" <?php echo isset( $options['enable_fb_title'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_url_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_url"><?php _e( "URL tag", 'heateor-open-graph-meta-tags' ); ?> (og:url)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_url" name="heateor_ogmt[enable_fb_url]" type="checkbox" <?php echo isset( $options['enable_fb_url'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_type_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_type"><?php _e( "Type tag", 'heateor-open-graph-meta-tags' ); ?> (og:type)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_type" name="heateor_ogmt[enable_fb_type]" type="checkbox" <?php echo isset( $options['enable_fb_type'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr id="heateor_ogmt_enable_fb_type_options">
									<th>
									<img id="heateor_ogmt_fb_homepage_type_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_fb_homepage_type"><?php _e( "Homepage type", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<select id="heateor_ogmt_fb_homepage_type" name="heateor_ogmt[fb_homepage_type]">
										<option <?php echo $options['fb_homepage_type'] == 'website' ? 'selected' : '' ; ?> value="website">website</option>
										<option <?php echo $options['fb_homepage_type'] == 'blog' ? 'selected' : '' ; ?> value="blog">blog</option>
									</select>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_dates_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_dates"><?php _e( "Published and Modified dates tags", 'heateor-open-graph-meta-tags' ); ?> (article:published_time, article:modified_time, og:updated_time)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_dates" name="heateor_ogmt[enable_fb_dates]" type="checkbox" <?php echo isset( $options['enable_fb_dates'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_enable_fb_dates_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Works for posts only', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_article_section_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_article_section"><?php _e( "Article section tags", 'heateor-open-graph-meta-tags' ); ?> (article:section)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_article_section" name="heateor_ogmt[enable_fb_article_section]" type="checkbox" <?php echo isset( $options['enable_fb_article_section'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_enable_fb_article_section_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Works for posts only, from the categories', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_publisher_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_publisher"><?php _e( "Publisher Page tag", 'heateor-open-graph-meta-tags' ); ?> (article:publisher)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_publisher" name="heateor_ogmt[enable_fb_publisher]" type="checkbox" <?php echo isset( $options['enable_fb_publisher'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_enable_fb_publisher_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Enable to link your website to the publisher Facebook page', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr id="heateor_ogmt_enable_fb_publisher_row" <?php echo ! isset( $options['enable_fb_publisher'] ) ? 'style="display:none"' : '' ?> >
									<th>
									<img id="heateor_ogmt_fb_facebook_page_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_fb_facebook_page"><?php _e( "Website's Facebook Page", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_fb_facebook_page" name="heateor_ogmt[fb_facebook_page]" type="text" value="<?php echo $options['fb_facebook_page']; ?>" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_fb_facebook_page_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Full URL with http://', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_author_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_author"><?php _e( "Author Profile tag", 'heateor-open-graph-meta-tags' ); ?> (article:author)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_author" name="heateor_ogmt[enable_fb_author]" type="checkbox" <?php echo isset( $options['enable_fb_author'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_enable_fb_author_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( "Enable to link the article to author's Facebook profile. The user's Facebook profile URL must be filled in", 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_description_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_description"><?php _e( "Description tag", 'heateor-open-graph-meta-tags' ); ?> (og:description)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_description" name="heateor_ogmt[enable_fb_description]" type="checkbox" <?php echo isset( $options['enable_fb_description'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_image_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_image"><?php _e( "Image tag", 'heateor-open-graph-meta-tags' ); ?> (og:image)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_image" name="heateor_ogmt[enable_fb_image]" type="checkbox" <?php echo isset( $options['enable_fb_image'] ) ? 'checked = "checked"' : '';?> value="1" />
									<br/>
									<small><?php _e( 'Minimum image dimension is 200x200 pixels for Facebook to load them in sharer. Ideal dimension 1200x630 pixels. Recommended dimension 600x315 pixels.', 'heateor-open-graph-meta-tags' ) ?></small>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_image_size_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_image_size"><?php _e( "Image size tags", 'heateor-open-graph-meta-tags' ); ?> (og:image:width, og:image:height)</label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_image_size" name="heateor_ogmt[enable_fb_image_size]" type="checkbox" <?php echo isset( $options['enable_fb_image_size'] ) ? 'checked = "checked"' : '';?> value="1" />
									<br/>
									<small><?php _e( 'Use ONLY if Facebook is having problems loading the image when the post is shared for the first time.', 'heateor-open-graph-meta-tags' ) ?></small>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_enable_fb_og_cache_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_enable_fb_og_cache"><?php _e( "Clear Facebook Open Graph Tags cache every time a post/page is saved", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_enable_fb_og_cache" name="heateor_ogmt[enable_fb_cache_clearer]" type="checkbox" <?php echo isset( $options['enable_fb_cache_clearer'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>
							</table>
						</div>	
					</div>
				</div>
				<?php include 'heateor-open-graph-meta-tags-about.php'; ?>
			</div>

			<div class="menu_containt_div" id="tabs-3">
				<div class="clear"></div>
				<div class="heateor_ogmt_left_column">
					<div class="stuffbox">
						<h3><label><?php _e( 'Twitter Cards', 'heateor-open-graph-meta-tags' );?></label></h3>
						<div class="inside">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
								<tr>
									<th>
										<label><?php _e( "Include:", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_title_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_title"><?php _e( "Title tag", 'heateor-open-graph-meta-tags' ); ?> (twitter:title)</label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_title" name="heateor_ogmt[enable_twitter_title]" type="checkbox" <?php echo isset( $options['enable_twitter_title'] ) ? 'checked = "checked"' : ''; ?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_url_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_url"><?php _e( "Url tag (twitter:url)", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_url" name="heateor_ogmt[enable_twitter_url]" type="checkbox" <?php echo isset( $options['enable_twitter_url'] ) ? 'checked = "checked"' : ''; ?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_website_username_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_website_username"><?php _e( "Website Username tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_website_username" name="heateor_ogmt[enable_twitter_website_username]" type="checkbox" <?php echo isset( $options['enable_twitter_website_username'] ) ? 'checked = "checked"' : ''; ?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_twitter_website_username_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Enable to link your website to a Twitter profile', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr id="heateor_ogmt_twitter_website_username_row" <?php echo ! isset( $options['enable_twitter_website_username'] ) ? 'style="display:none"' : '' ?> >
									<th>
									<img id="heateor_ogmt_twitter_username_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_username"><?php _e( "Twitter username (without @)", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_username" name="heateor_ogmt[twitter_username]" type="textbox" value="<?php echo $options['twitter_username'] ?>" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_creator_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_creator"><?php _e( "Creator tag", 'heateor-open-graph-meta-tags' ); ?> (twitter:creator)</label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_creator" name="heateor_ogmt[enable_twitter_creator]" type="checkbox" <?php echo isset( $options['enable_twitter_creator'] ) ? 'checked = "checked"' : ''; ?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_twitter_creator_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( "&lt;meta name='twitter:creator' content='@...'/&gt; Enable to link the article to the author's Twitter profile. The user's Twitter username must be filled in", 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_description_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_description"><?php _e( "Description tag", 'heateor-open-graph-meta-tags' ); ?> (twitter:description)</label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_description" name="heateor_ogmt[enable_twitter_description]" type="checkbox" <?php echo isset( $options['enable_twitter_description'] ) ? 'checked = "checked"' : ''; ?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_twitter_description_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;meta name="twitter:description" content"..."/&gt; Good for Twitter sharing if no other plugin is setting it already', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_image_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_image"><?php _e( "Image tag", 'heateor-open-graph-meta-tags' ); ?> (twitter:image:src)</label>
									</th>
									<td>
									<input id="heateor_ogmt_twitter_image" name="heateor_ogmt[enable_twitter_image]" type="checkbox" <?php echo isset( $options['enable_twitter_image'] ) ? 'checked = "checked"' : ''; ?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_twitter_image_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;meta name="twitter:image:src" content="..."/&gt; Good for Twitter sharing if no other plugin is setting it already', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_twitter_card_type_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_twitter_card_type"><?php _e( "Twitter Card type", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<select id="heateor_ogmt_twitter_card_type" name="heateor_ogmt[twitter_card_type]">
										<option <?php echo $options['twitter_card_type'] == 'summary_large_image' ? 'selected' : '' ; ?> value="summary_large_image"><?php _e( 'Summary card with large image', 'heateor-open-graph-meta-tags' ); ?></option>
										<option <?php echo $options['twitter_card_type'] == 'summary' ? 'selected' : '' ; ?> value="summary"><?php _e( 'Summary card', 'heateor-open-graph-meta-tags' ); ?></option>
									</select>
									</td>
								</tr>
							</table>
						</div>	
					</div>
				</div>
				<?php include 'heateor-open-graph-meta-tags-about.php'; ?>
			</div>
			
			<div class="menu_containt_div" id="tabs-4">
				<div class="clear"></div>
				<div class="heateor_ogmt_left_column">
					<div class="stuffbox">
						<h3><label><?php _e( 'Google/Schema', 'heateor-open-graph-meta-tags' ); ?></label></h3>
						<div class="inside">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
								<tr>
									<th>
										<label><?php _e( "Include:", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_google_itemprop_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_google_itemprop"><?php _e( "Schema.org 'itemprop' Name tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_google_itemprop" name="heateor_ogmt[enable_google_itemprop]" type="checkbox" <?php echo isset( $options['enable_google_itemprop'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_google_publisher_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_google_publisher"><?php _e( "Google+ 'publisher' tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_google_publisher" name="heateor_ogmt[enable_google_publisher]" type="checkbox" <?php echo isset( $options['enable_google_publisher'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_google_publisher_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Enable, if you want to link the website to the publisher Google+ page', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr id="heateor_ogmt_google_publisher_row" <?php echo ! isset( $options['enable_google_publisher'] ) ? 'style="display:none"' : '' ?> >
									<th>
									<img id="heateor_ogmt_google_page_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_google_page"><?php _e( "Website's Google+ page", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_google_page" name="heateor_ogmt[google_page]" type="text" value="<?php echo $options['google_page']; ?>" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_google_page_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( 'Full URL with http://', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_google_author_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_google_author"><?php _e( "Google+ link rel 'author' tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_google_author" name="heateor_ogmt[enable_google_author]" type="checkbox" <?php echo isset( $options['enable_google_author'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_google_author_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( "&lt;link rel='author' href='...'/&gt; Enable to link the article to the author's Google+ Profile (authorship). The user's Google+ profile URL must be filled in.", 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_google_description_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_google_description"><?php _e( "Schema.org 'itemprop' Description tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_google_description" name="heateor_ogmt[enable_google_description]" type="checkbox" <?php echo isset( $options['enable_google_description'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_google_description_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;meta itemprop="description" content="..."/&gt; Good for Google+ sharing if no other plugin is setting it already', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>

								<tr>
									<th>
									<img id="heateor_ogmt_google_image_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
									<label for="heateor_ogmt_google_image"><?php _e( "Schema.org 'itemprop' Image tag", 'heateor-open-graph-meta-tags' ); ?></label>
									</th>
									<td>
									<input id="heateor_ogmt_google_image" name="heateor_ogmt[enable_google_image]" type="checkbox" <?php echo isset( $options['enable_google_image'] ) ? 'checked = "checked"' : '';?> value="1" />
									</td>
								</tr>

								<tr class="heateor_ogmt_help_content" id="heateor_ogmt_google_image_help_cont">
									<td colspan="2">
									<div style="float:left">
									<?php _e( '&lt;meta itemprop="image" content="..."/&gt; Good for Google+ sharing if no other plugin is setting it already', 'heateor-open-graph-meta-tags' ) ?>
									</div>
									</td>
								</tr>
							</table>
						</div>	
					</div>
				</div>
				<?php include 'heateor-open-graph-meta-tags-about.php'; ?>
			</div>

			<?php if ( $third_party_plugins ) { ?>
				<div class="menu_containt_div" id="tabs-5">
					<div class="clear"></div>
					<div class="heateor_ogmt_left_column">
						<div class="stuffbox">
							<h3><label><?php _e( '3rd Party Integration', 'heateor-open-graph-meta-tags' );?></label></h3>
							<div class="inside">
								<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
									<?php if ( $this->is_yoast_seo_active() ) { ?>
										<tr>
											<td colspan="2">
												<p>
												<?php _e( 'Disable "Add Open Graph meta data" and "Add Twitter card meta data" options from <a href="admin.php?page=wpseo_social" target="_blank">SEO &gt; Social</a> page to avoid duplicate meta tags', 'heateor-open-graph-meta-tags' ); ?>
												</p>
											</td>
										</tr>
										
										<tr>
											<th>
											<img id="heateor_ogmt_yoast_seo_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
											<label for="heateor_ogmt_yoast_seo"><?php _e( "Use title, url (canonical) and description tags from Yoast SEO", 'heateor-open-graph-meta-tags' ); ?></label>
											</th>
											<td>
											<input id="heateor_ogmt_yoast_seo" name="heateor_ogmt[yoast_tags]" type="checkbox" <?php echo isset( $options['yoast_tags'] ) ? 'checked = "checked"' : '';?> value="1" />
											</td>
										</tr>
									<?php } ?>

									<?php if ( $this->is_woocommerce_active() ) { ?>
										<tr>
											<th>
											<img id="heateor_ogmt_woocom_image_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
											<label for="heateor_ogmt_woocom_image"><?php _e( "Use Product Category thumbnail as Open Graph Image", 'heateor-open-graph-meta-tags' ); ?></label>
											</th>
											<td>
											<input id="heateor_ogmt_woocom_image" name="heateor_ogmt[woocom_image]" type="checkbox" <?php echo isset( $options['woocom_image'] ) ? 'checked = "checked"' : '';?> value="1" />
											<br/>
											<small>
												<?php _e( 'Recommended, if you set large thumbnails for Product Categories and want to use them as Open Graph Images on listing pages', 'heateor-open-graph-meta-tags' );?>
											</small>
											</td>
										</tr>
									<?php } ?>

									<?php if ( $this->is_subheading_plugin_active() ) { ?>
										<tr>
											<th>
											<img id="heateor_ogmt_subheading_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
											<label for="heateor_ogmt_subheading"><?php _e( "Add SubHeading to Post/Page title", 'heateor-open-graph-meta-tags' ); ?></label>
											</th>
											<td>
											<input id="heateor_ogmt_subheading" name="heateor_ogmt[show_subheading]" type="checkbox" <?php echo isset( $options['show_subheading'] ) ? 'checked = "checked"' : '';?> value="1" />
											</td>
										</tr>
									<?php } ?>

									<?php if ( $this->is_business_directory_active() ) { ?>
										<tr>
											<th>
											<img id="heateor_ogmt_subheading_help" class="heateor_ogmt_help_bubble" src="<?php echo plugins_url( '../../images/info.png', __FILE__ ) ?>" />
											<label for="heateor_ogmt_subheading"><?php _e( "Use BDP listing contents as OG tags", 'heateor-open-graph-meta-tags' ); ?></label>
											</th>
											<td>
											<input id="heateor_ogmt_subheading" name="heateor_ogmt[show_bdp]" type="checkbox" <?php echo isset( $options['show_bdp'] ) ? 'checked = "checked"' : '';?> value="1" />
											<br/>
											<small>
												<?php _e( 'Enabling "Include URL", "Set Canonical URL", "Include Description" and "Include Image" options above is HIGHLY recommended', 'heateor-open-graph-meta-tags' );?>
											</small>
											</td>
										</tr>
									<?php } ?>
								</table>
							</div>	
						</div>
					</div>
					<?php include 'heateor-open-graph-meta-tags-about.php'; ?>
				</div>
			<?php } ?>

			<div class="menu_containt_div" id="tabs-6">
				<div class="clear"></div>
				<div class="heateor_ogmt_left_column">
					<div class="stuffbox">
						<h3><label><?php _e( 'Troubleshooter', 'heateor-open-graph-meta-tags' );?></label></h3>
						<div class="inside">
							<table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-table editcomment menu_content_table">
								<tr>
									<td>
									<?php _e( 'If image and other meta content is not appearing in the Facebook sharer, visit <a target="_blank" href="https://developers.facebook.com/tools/debug/">this</a> link and debug the problematic URL that is giving you problem', 'heateor-open-graph-meta-tags' ) ?>
									</td>
								</tr>
							</table>
						</div>	
					</div>
				</div>
				<?php include 'heateor-open-graph-meta-tags-about.php'; ?>
			</div>

			<div class="heateor_ogmt_clear"></div>
			<p class="submit">
				<input style="margin-left:8px" type="submit" name="save" class="button button-primary" value="<?php _e( "Save Changes", 'heateor-open-graph-meta-tags' ); ?>" />
			</p>
			</form>
		</div>
</div>
