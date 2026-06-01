<?php

/**
 * Contains functions responsible for functionality at front-end of website
 *
 * @since      1.0
 *
 */

/**
 * This class defines all code necessary for functionality at front-end of website
 *
 * @since      1.0
 *
 */
class Heateor_Open_Graph_Meta_Tags_Public {

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
	 * Facebook Open Graph Image size
	 *
	 * @since    1.0
	 */
	private $fb_image_size = '';

	/**
	 * Get saved options.
	 *
	 * @since    1.0
     * @param    array     $options    Plugin options saved in database
     * @param    string    $version    Current version of the plugin
	 */
	public function __construct( $options, $version ) {

		$this->options = $options;
		$this->version = $version;

	}

	/**
	 * Get http/https protocol at the website
	 *
	 * @since    1.0
	 */
	public function get_http_protocol() {
		
		if ( isset( $_SERVER['HTTPS'] ) && ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] != 'off' ) {
			return "https://";
		} else {
			return "http://";
		}
	
	}

	/**
	 * Upgrade database according to plugin version
	 *
	 * @since    1.0
	 */
	public function update_db_check() {

		$current_version = get_option( 'heateor_ogmt_version' );
		if ( $current_version != $this->version ) {
			// update plugin version in database
			update_option( 'heateor_ogmt_version', $this->version );
		}
	
	}

	/**
	 * Add Open Graph Namespace
	 *
	 * @since    1.0
	 */
	public function add_open_graph_namespace( $output ) {
		
		if ( stristr( $output, 'xmlns:og' ) === false ) {
			$output = $output . ' xmlns:og="http://ogp.me/ns#"';
		}
		if ( stristr( $output, 'xmlns:fb' ) === false ) {
			$output = $output . ' xmlns:fb="http://ogp.me/ns/fb#"';
		}

		return $output;
		
	}

	/**
	 * Insert meta tags in <head>
	 *
	 * @since    1.0
	 */
	public function insert_meta_tags() {

		$fb_og_type = 'article';
		$fb_image_additional = array();
		$fb_locale = '';
		$fb_og_image = '';
		$facebook_author_linkrelgp = '';
		$facebook_author_twitter = '';

		global $post;
		$custom_meta = array();
		if ( is_object( $post ) && isset( $post->ID ) ) {
			$custom_meta = get_post_meta( $post->ID, '_heateor_ogmt_meta', true );
		}
		if ( $custom_meta && isset( $custom_meta['disable_tags'] ) && $custom_meta['disable_tags'] == 1 ) {
			return;
		}

		if ( is_singular() ) {
			// title OG meta tag
			$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( $post->post_title ), true ) );
			//if SubHeading is enabled
			if ( isset( $this->options['show_subheading'] ) && $this->is_subheading_plugin_active() ) {
				$facebook_title .= ' - ' . get_the_subheading();
			}

			// url OG meta tag
			$fb_og_url = get_permalink();
			// if homepage
			if ( is_front_page() ) {
				$fb_og_url = get_option( 'home' ) . ( isset( $this->options['trailing_slash'] ) ? '/' : '' );
				$fb_og_type = $this->options['fb_homepage_type'];
			}

			// description OG meta tag
			if ( trim( $post->post_excerpt ) != '' ) {
				$fb_og_desc = trim( $post->post_excerpt );
			} else {
				$fb_og_desc = trim( $post->post_content );
			}
			$fb_og_desc = intval( $this->options['description_max_length'] ) > 0 ? mb_substr( esc_attr( wp_strip_all_tags( strip_shortcodes( stripslashes( $fb_og_desc ) ), true ) ), 0, $this->options['description_max_length'] ) : esc_attr( wp_strip_all_tags( strip_shortcodes( stripslashes( $fb_og_desc ) ), true ) );

			// image OG meta tag
			if ( isset( $this->options['enable_fb_image'] ) || isset( $this->options['enable_google_image'] ) || isset( $this->options['enable_twitter_image'] ) ) {
				$fb_og_image = $this->get_post_image();
			}

			// Author
			$facebook_author = '';
			$facebook_author_meta = '';
			
			$author_id = $post->post_author;
			if ( $author_id > 0 && ! ( is_page() && isset( $this->options['hide_author_pages'] ) ) ) {
				$facebook_author = get_the_author_meta( 'heateor_ogmt_author_facebook', $author_id );
				$facebook_author_meta = get_the_author_meta( 'display_name', $author_id );
				$facebook_author_linkrelgp = get_the_author_meta( 'heateor_ogmt_author_googleplus', $author_id );
				$facebook_author_twitter = get_the_author_meta( 'heateor_ogmt_author_twitter', $author_id );
			}

			// Published and Modified time
			if ( is_singular( 'post' ) ) {
				$facebook_article_pub_date = get_the_date( 'c' );
				$facebook_article_mod_date = get_the_modified_date( 'c' );
			} else {
				unset( $this->options['enable_fb_dates'] );
				$facebook_article_pub_date = '';
				$facebook_article_mod_date = '';
			}

			// Categories
			if ( is_singular( 'post' ) ) {
				$cats = get_the_category();
				if ( ! is_wp_error( $cats ) && ( is_array( $cats ) && count( $cats ) > 0 ) ) {
					$fb_sections = array();
					foreach ( $cats as $cat ) {
						$fb_sections[] = $cat->name;
					}
				}
			} else {
				unset( $this->options['enable_fb_article_section'] );
			}

			// Business Directory Plugin
			if ( isset( $this->options['show_bdp'] ) ) {
				@include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
				if ( is_plugin_active( 'business-directory-plugin/wpbusdirman.php' ) ) {
					global $wpbdp;
					$bdp_action = $wpbdp->controller->get_current_action();
					switch( $bdp_action ) {
						case 'showlisting':
							$listing_id = get_query_var( 'listing' ) ? wpbdp_get_post_by_slug( get_query_var( 'listing' ) )->ID : '';
							if ( $listing_id ) {
								$bdp_post = get_post( $listing_id );
								$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( $bdp_post->post_title ), true ) ) . ' - ' . $facebook_title;
								$fb_og_url = get_permalink( $listing_id );
								if ( trim( $bdp_post->post_excerpt ) != '' ) {
									//If there's an excerpt that's what we'll use
									$fb_og_desc = trim( $bdp_post->post_excerpt );
								} else {
									//If not we grab it from the content
									$fb_og_desc = trim( $bdp_post->post_content );
								}
								$fb_og_desc = ( intval( $this->options['description_max_length'] ) > 0 ? mb_substr( esc_attr( wp_strip_all_tags( strip_shortcodes( stripslashes( $fb_og_desc ) ), true ) ), 0, $this->options['description_max_length'] ) : esc_attr( wp_strip_all_tags( strip_shortcodes( stripslashes( $fb_og_desc ) ), true ) ) );
								if ( isset( $this->options['enable_fb_image'] ) || isset( $this->options['enable_google_image'] ) || isset( $this->options['enable_twitter_image'] ) ) {
									$thumbnail_done = false;
									if ( isset( $this->options['image_tag_featured'] ) ) {
										// Featured image
										if ( $attachment_id = get_post_thumbnail_id( $bdp_post->ID ) ) {
											$fb_og_image = wp_get_attachment_url( $attachment_id, false );
											$thumbnail_done = true;
										}
									}
									if ( ! $thumbnail_done ) {
										// Main image
										if ( $thumbnail_id = wpbdp_listings_api()->get_thumbnail_id( $bdp_post->ID ) ) {
											$fb_og_image = wp_get_attachment_url( $thumbnail_id, false );
										}
									}
								}
							}
							break;
						case 'browsecategory':
								//Categories
								$term = get_term_by( 'slug', get_query_var( 'category' ), wpbdp_categories_taxonomy() );
								$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( $term->name ), true ) ) . ' - ' . $facebook_title;
								$fb_og_url = get_term_link( $term );
								if ( trim( $term->description ) != '' ) {
									$fb_og_desc = trim( $term->description );
								}
							break;
						case 'main':
							//Main page
							//No changes
							break;
						default:
							//No changes
							break;
					}
				}
			}
		} else {
			global $wp_query;
			
			$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( get_bloginfo( 'name' ) ), true ) );
			$fb_og_url = ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] == 'on' ) ? 'https://' : 'http://' ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; 

			$fb_article_sections_show = 0;
			$fb_article_dates_show = 0;
			$fb_author_show = 0;
			$fb_author_show_meta = 0;
			$fb_author_show_linkrelgp = 0;
			$fb_author_show_twitter = 0;

			switch( $this->options['homepage_description'] ) {
				case 'custom':
					$fb_og_desc = esc_attr( wp_strip_all_tags( stripslashes( $this->options['homepage_description_custom'] ), true ) );
					//WPML?
					if ( function_exists( 'icl_object_id' ) && function_exists( 'icl_register_string' ) ) {
						global $sitepress;
						if ( ICL_LANGUAGE_CODE != $sitepress->get_default_language() ) {
							$fb_og_desc = icl_t( 'wd-fb-og', 'wd_fb_og_desc_homepage_customtext', $fb_og_desc );
						}
					}
					break;
				default:
					$fb_og_desc = esc_attr( wp_strip_all_tags( stripslashes( get_bloginfo( 'description' ) ), true ) );
					break;
			}
			
			if ( is_category() ) {
				$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( single_cat_title( '', false ) ), true ) );
				$term = $wp_query->get_queried_object();
				$fb_og_url = get_term_link( $term, $term->taxonomy );
				$cat_desc = trim( esc_attr( wp_strip_all_tags( stripslashes( category_description() ), true ) ) );
				if ( trim( $cat_desc ) != '' ) {
					$fb_og_desc = $cat_desc;
				}
			} else {
				if ( is_tag() ) {
					$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( single_tag_title( '', false ) ), true ) );
					$term = $wp_query->get_queried_object();
					$fb_og_url = get_term_link( $term, $term->taxonomy );
					$tag_desc = trim( esc_attr( wp_strip_all_tags( stripslashes( tag_description() ), true ) ) );
					if ( trim( $tag_desc ) != '' ) {
						$fb_og_desc = $tag_desc;
					}
				} else {
					if ( is_tax() ) {
						$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( single_term_title( '', false ) ), true ) );
						$term = $wp_query->get_queried_object();
						$fb_og_url = get_term_link( $term, $term->taxonomy );
						//WooCommerce
						if ( class_exists( 'woocommerce' ) && is_product_category() ) {
							if ( $thumbnail_id = get_woocommerce_term_meta( $term->term_id, 'thumbnail_id', true ) ) {
								if ( $image = wp_get_attachment_url( $thumbnail_id ) ) {
									$fb_og_image = $image;
								}
							}
						}
					} else {
						if ( is_search() ) {
							$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( __( 'Search for' ) .' "' .get_search_query() .'"' ), true ) );
							$fb_og_url = get_search_link();
						} else {
							if ( is_author() ) {
								$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( get_the_author_meta( 'display_name', get_query_var( 'author' ) ) ), true ) );
								$fb_og_url = get_author_posts_url( get_query_var( 'author' ), get_query_var( 'author_name' ) );
							} else {
								if ( is_archive() ) {
									if ( is_day() ) {
										$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( get_query_var( 'day' ) . ' ' .single_month_title( ' ', false ) . ' ' . __( 'Archives' ) ), true ) );
										$fb_og_url = get_day_link( get_query_var( 'year' ), get_query_var( 'monthnum' ), get_query_var( 'day' ) );
									} else {
										if ( is_month() ) {
											$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( single_month_title( ' ', false ) . ' ' . __( 'Archives' ) ), true ) );
											$fb_og_url = get_month_link( get_query_var( 'year' ), get_query_var( 'monthnum' ) );
										} else {
											if ( is_year() ) {
												$facebook_title = esc_attr( wp_strip_all_tags( stripslashes( get_query_var( 'year' ) . ' ' . __( 'Archives' ) ), true ) );
												$fb_og_url = get_year_link( get_query_var( 'year' ) );
											}
										}
									}
								} else {
									if ( is_front_page() ) {
										$fb_og_url = get_option( 'home' ) . ( isset( $this->options['trailing_slash'] ) ? '/' : '' );
										$fb_og_type =  $this->options['fb_homepage_type'];
									}
								}
							}
						}
					}
				}
			}
		}

		// If there is no description, just add the title
		if ( trim( $fb_og_desc ) == '' ) {
			$fb_og_desc = $facebook_title;
		}		
	
		// MONSTERINSIGHTS?
		if ( isset( $this->options['yoast_tags'] ) ) {
			if ( defined( 'WPSEO_VERSION' ) ) {
				$wpseo = WPSEO_Frontend::get_instance();
				$facebook_title = wp_strip_all_tags( $wpseo->title( false ), true );
				// Title - From SubHeading plugin
				if ( isset( $this->options['show_subheading'] ) ) {
					if ( $this->is_subheading_plugin_active() ) {
						$facebook_title .= ' - ' . get_the_subheading();
					}
				}
				// URL - From Yoast SEO
				$fb_og_url = $wpseo->canonical( false );
				// Description - From Yoast SEO OR our plugin
				$fb_desc_temp = $wpseo->metadesc( false );
				$fb_og_desc = wp_strip_all_tags( trim( $fb_desc_temp ) != '' ? trim( $fb_desc_temp ) : $fb_og_desc, true );
			}
		}

		// Plugin Filters
		$facebook_title = apply_filters( 'heateor_ogmt_fb_og_title', $facebook_title );
		$fb_og_url = apply_filters( 'heateor_ogmt_fb_og_url', $fb_og_url );
		$fb_og_desc = apply_filters( 'heateor_ogmt_fb_og_desc', $fb_og_desc );
		$fb_og_image = apply_filters( 'heateor_ogmt_fb_og_image', $fb_og_image );
		$fb_image_additional = apply_filters( 'heateor_ogmt_fb_og_image_additional', $fb_image_additional );
		$fb_locale = apply_filters( 'heateor_ogmt_fb_og_locale', $fb_locale );
		$fb_image_size = false;
		
		if ( isset( $this->options['enable_fb_image'] ) && trim( $fb_og_image ) != '' ) {
			if ( isset( $this->options['enable_fb_image_size'] ) ) {
				if ( $this->fb_image_size ) { 
					$fb_image_size = $this->fb_image_size;
				} else {
					$fb_image_size = $this->get_open_graph_image_size( $fb_og_image );
				}
			}
		} else {
			unset( $this->options['enable_fb_image_size'] );
		}

		// encode spaces in URLs
		if ( isset( $fb_og_url ) && $fb_og_url == '' ) {
			$fb_og_url = ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] == 'on' ) ? 'https://' : 'http://' ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; 
		} elseif ( trim( $fb_og_url ) != '' ) {
			$fb_og_url = str_replace( ' ', '%20', trim( $fb_og_url ) );
		}
		if ( isset( $fb_publisher ) && trim( $fb_publisher ) != '' ) {
			$fb_publisher =	str_replace( ' ', '%20', trim( $fb_publisher ) );
		}
		
		$this->options['google_page'] = str_replace( ' ', '%20', $this->options['google_page'] );
		
		if ( isset( $facebook_author ) && trim( $facebook_author ) != '' ) {
			$facebook_author = str_replace( ' ', '%20', trim( $facebook_author ) );
		}
		if ( isset( $facebook_author_linkrelgp ) && trim( $facebook_author_linkrelgp ) != '' ) {
			$facebook_author_linkrelgp = str_replace( ' ', '%20', trim( $facebook_author_linkrelgp ) );
		}
		if ( isset( $fb_og_image ) && trim( $fb_og_image ) == '' && isset( $this->options['image_tag_default'] ) && $this->options['default_image'] != '' ) {
			$fb_og_image = $this->options['default_image'];
		}
		if ( isset( $fb_og_image ) && trim( $fb_og_image ) != '' ) {
			$fb_og_image = str_replace( ' ', '%20', trim( $fb_og_image ) );
		}
		if ( isset( $fb_image_additional ) && is_array( $fb_image_additional ) && count( $fb_image_additional ) ) {
			foreach ( $fb_image_additional as $key => $value ) {
				$fb_image_additional[$key] = str_replace( ' ', '%20', trim( $value ) );
			}
		}

		$fb_og_desc = esc_attr( strip_shortcodes( trim( $fb_og_desc ) ) );
		$facebook_title = esc_attr( trim( $facebook_title ) );

		$html = '
<!-- START - Heateor Open Graph Meta Tags ' . $this->version . ' -->';
		// General meta tags
		if ( isset( $this->options['canonical_url'] ) ) {
			$html .= '
<link rel="canonical" href="' . trim( esc_attr( $fb_og_url ) ) . '"/>';
		}
		if ( isset( $this->options['author_meta'] ) && $facebook_author_meta != '' ) {
			$html .= '
<meta name="author" content="' . trim( esc_attr( $facebook_author_meta ) ) . '"/>';
		}
		if ( isset( $this->options['meta_description_tag'] ) ) {
			$html .= '
<meta name="description" content="' . $fb_og_desc . '"/>';
		}
		// Facebook OG Meta Tags
		if ( isset( $this->options['enable_fb_locale'] ) ) {
			$html .= '
<meta property="og:locale" content="' . trim( esc_attr( trim( $fb_locale ) != '' ? trim( $fb_locale ) : trim( get_locale() ) ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_site_name'] ) ) {
			$html .= '
<meta property="og:site_name" content="' . trim( esc_attr( get_bloginfo( 'name' ) ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_title'] ) ) {
			$html .= '
<meta property="og:title" content="' . $facebook_title . '"/>';
		}
		if ( isset( $this->options['enable_fb_url'] ) ) {
			$html .= '
<meta property="og:url" content="' . trim( esc_attr( $fb_og_url ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_type'] ) ) {
			$html .= '
<meta property="og:type" content="' . trim( esc_attr( $fb_og_type ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_image'] ) && trim( $fb_og_image ) != '' ) {
			$html .= '
<meta property="og:image" content="' . trim( esc_attr( $fb_og_image ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_image'] ) && isset( $fb_image_additional ) && is_array( $fb_image_additional ) && count( $fb_image_additional ) > 0 ) {
			foreach ( $fb_image_additional as $fb_image_additional_temp ) {
				$html .= '
<meta property="og:image" content="' . trim( esc_attr( $fb_image_additional_temp ) ) . '"/>
	';
			}
		} else {
			//We only show the image size if we only have one image
			if( isset( $this->options['enable_fb_image_size'] ) && isset( $fb_image_size ) && is_array( $fb_image_size ) != '' ) {
				$html .= '
<meta property="og:image:width" content="' .intval( esc_attr( $fb_image_size[0] ) ) . '"/>
<meta property="og:image:height" content="' .intval( esc_attr( $fb_image_size[1] ) ) . '"/>';
			}
		}
		if ( isset( $this->options['enable_fb_dates'] ) ) {
			if ( trim( $facebook_article_pub_date ) != '' ) {
				$html .= '
<meta property="article:published_time" content="' . trim( esc_attr( $facebook_article_pub_date ) ) . '"/>';
			}
			if ( trim( $facebook_article_mod_date ) != '' ) {
				$html .= '
<meta property="article:modified_time" content="' . trim( esc_attr( $facebook_article_mod_date ) ) . '" />
<meta property="og:updated_time" content="' . trim( esc_attr( $facebook_article_mod_date ) ) . '" />
			';
			}
		}
		if ( isset( $this->options['enable_fb_article_section'] ) && isset( $fb_sections ) && is_array( $fb_sections ) && count( $fb_sections ) > 0 ) {
			foreach( $fb_sections as $fb_section ) {
				$html .= '
<meta property="article:section" content="' . trim( esc_attr( $fb_section ) ) . '"/>
		';
			}
		}
		if ( isset( $this->options['enable_fb_publisher'] ) && trim( $fb_publisher ) != '' ) {
			$html .= '
<meta property="article:publisher" content="' . trim( esc_attr( $fb_publisher ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_author'] ) && $facebook_author != '' ) {
			$html .= '
<meta property="article:author" content="' . trim( esc_attr( $facebook_author ) ) . '"/>';
		}
		if ( isset( $this->options['enable_fb_description'] ) ) {
			$html .= '
<meta property="og:description" content="' . $fb_og_desc . '"/>';
		}
		// Twitter cards
		if ( isset( $this->options['enable_twitter_title'] ) ) {
			$html .= '
<meta name="twitter:title" content="' . $facebook_title . '"/>';
		}
		if ( isset( $this->options['enable_twitter_url'] ) ) { 
			$html .= '
<meta name="twitter:url" content="' . trim( esc_attr( $fb_og_url ) ) . '"/>';
		}
		if ( isset( $this->options['enable_twitter_website_username'] ) && $this->options['twitter_username'] != '' ) {
			$html .= '
<meta name="twitter:site" content="@' . $this->options['twitter_username'] . '"/>';
		}
		if ( isset( $this->options['enable_twitter_creator'] ) && ( trim( $facebook_author_twitter ) != '' || $this->options['twitter_username'] != '' ) ) {
			$html .= '
<meta name="twitter:creator" content="@' . esc_attr( $facebook_author_twitter != '' ? $facebook_author_twitter : $this->options['twitter_username'] ) . '"/>';
		}
		if ( isset( $this->options['enable_twitter_description'] ) ) {
			$html .= '
<meta name="twitter:description" content="' . $fb_og_desc . '"/>';
		}
		if ( isset( $this->options['enable_twitter_image'] ) && trim( $fb_og_image ) != '' ) {
			$html .= '
<meta name="twitter:image" content="' . trim( esc_attr( $fb_og_image ) ) . '"/>';
		}
		if ( isset( $this->options['enable_twitter_title'] ) || isset( $this->options['enable_twitter_url'] ) || isset( $this->options['enable_twitter_creator'] ) || isset( $this->options['enable_twitter_website_username'] ) || isset( $this->options['enable_twitter_image'] ) ) {
			$html .= '
<meta name="twitter:card" content="' . esc_attr( $this->options['twitter_card_type'] == 'summary_large' ? 'summary_large_image' : $this->options['twitter_card_type'] ) . '"/>';
		}
		// Google/Schema Tags
		if ( isset( $this->options['enable_google_itemprop'] ) ) {
			$html .= '
<meta itemprop="name" content="' . $facebook_title . '"/>';
		}
		if ( isset( $this->options['enable_google_publisher'] ) && $this->options['google_page'] != '' ) {
			$html .= '
<link rel="publisher" href="' . esc_attr( $this->options['google_page'] ) . '"/>';
		}
		if ( isset( $this->options['enable_google_author'] ) && trim( $facebook_author_linkrelgp ) != '' ) {
			$html .= '
<link rel="author" href="' . trim( esc_attr( $facebook_author_linkrelgp ) ) . '"/>';
		}
		if ( isset( $this->options['enable_google_description'] ) ) {
			$html .= '
<meta itemprop="description" content="' . $fb_og_desc . '"/>';
		}
		if ( isset( $this->options['enable_google_image'] ) && trim( $fb_og_image ) != '' ) {
			$html .= '
<meta itemprop="image" content="' . trim( esc_attr( $fb_og_image) ) . '"/>';
		}
		$html .= '
<!-- END - Heateor Open Graph Meta Tags -->

';
		echo $html;

	}

	/**
	 * Get image url to show in image meta tag for singular page
	 *
	 * @since    1.0
	 */
	private function get_post_image() {

		global $post;

		$thumbnail_done = false;
		$fb_og_image = '';
		$fb_og_image_min_size = 200;
		
		// Attachment page
		if ( is_attachment() ) {
			if ( $attachment_image_url = wp_get_attachment_image_src( null, 'full' ) ) {
				$fb_og_image = trim( $attachment_image_url[0] );
				$image_size = array( intval( $attachment_image_url[1] ), intval( $attachment_image_url[2] ) );
				if ( trim( $fb_og_image ) != '' ) {
					$thumbnail_done = true;
				}
			}
		}

		// Featured image
		if ( ! $thumbnail_done ) {
			if ( function_exists( 'get_post_thumbnail_id' ) ) {
				if ( isset( $this->options['image_tag_featured'] ) ) {
					if ( $attachment_id = get_post_thumbnail_id( $post->ID ) ) {
						$fb_og_image = wp_get_attachment_url( $attachment_id, false );
						$thumbnail_done = true;
					}
				}
			}
		}

		// From post/page content
		if ( ! $thumbnail_done ) {
			if ( isset( $this->options['image_tag_first'] ) ) {
				$imgreg = '/<img .*src=["\']( [^ ^"^\']*)["\']/';
				preg_match_all( $imgreg, trim( $post->post_content ), $matches );
				if ( $matches[1] ) {
					$temp_image = false;
					foreach( $matches[1] as $image ) {
						$pos = strpos( $image, home_url() );
						if ( $pos === false ) {
							if ( stristr( $image, 'http://' ) || stristr( $image, 'https://' ) || mb_substr( $image, 0, 2 ) == '//' ) {
								if ( mb_substr( $image, 0, 2 ) == '//' ) { $image = ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] == 'on' ) ? 'https:' : 'http:' ) . $image; }
								$temp_image = $image;
								$temp_image_size = $temp_image;
							} else {
								$temp_image = home_url() . $image;
								$temp_image_size = ABSPATH . str_replace( trailingslashit( home_url() ), '', $temp_image );
							}
						} else {
							$temp_image = $image;
							$temp_image_size = ABSPATH . str_replace( trailingslashit( home_url() ), '', $temp_image );
						}
						if ( $temp_image ) {
							if ( $image_size = $this->get_open_graph_image_size( $temp_image_size ) ) {
								if ( $image_size[0] >= $fb_og_image_min_size && $image_size[1] >= $fb_og_image_min_size ) {
									$fb_og_image = $temp_image;
									$thumbnail_done = true;
									break;
								}
							}
						}
					}
				}
			}
		}

		// From media gallery
		if ( ! $thumbnail_done ) {
			if ( isset( $this->options['image_tag_gallery'] ) ) {
				$images = get_posts( array( 'post_type' => 'attachment', 'numberposts' => -1, 'post_status' => null, 'order' => 'ASC', 'orderby' => 'menu_order', 'post_mime_type' => 'image', 'post_parent' => $post->ID ) );
				if ( $images ) {
					foreach( $images as $image ) {
						$temp_image = wp_get_attachment_url( $image->ID, false );
						$temp_image_size = ABSPATH . str_replace( trailingslashit( home_url() ), '', $temp_image );
						if ( $image_size = $this->get_open_graph_image_size( $temp_image_size ) ) {
							if ( $image_size[0] >= $fb_og_image_min_size && $image_size[1] >= $fb_og_image_min_size ) {
								$fb_og_image = $temp_image;
								$thumbnail_done = true;
								break;
							}
						}
					}
				}
			}
		}

		// From default
		if ( ! $thumbnail_done ) {
			if ( isset( $this->options['image_tag_default'] ) ) {
				$fb_og_image = $this->options['default_image'];
			} else {
				$fb_og_image = '';
			}
		}

		return $fb_og_image;
	
	}

	/**
	 * Get image size
	 *
	 * @since    1.0
	 */
	private function get_open_graph_image_size( $image_url ) {
		
		if ( stristr( $image_url, 'http://' ) || stristr( $image_url, 'https://' ) || mb_substr( $image_url, 0, 2 ) == '//' ) {
			if ( function_exists( 'curl_version' ) && function_exists( 'imagecreatefromstring' ) ) {
				// Getting just a part of the image to speed things up. From http://stackoverflow.com/questions/4635936/super-fast-getimagesize-in-php
				$headers = array(
					"Range: bytes=0-32768"
				);
				$curl = curl_init( $image_url );
				curl_setopt( $curl, CURLOPT_HTTPHEADER, $headers );
				curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
				//Set HTTP REFERER and USER AGENT just in case. Some servers may have hotlinking protection
				curl_setopt( $curl, CURLOPT_REFERER, ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] == 'on' ) ? 'https://' : 'http://' ) . $_SERVER['HTTP_HOST']. $_SERVER['REQUEST_URI'] );
				curl_setopt( $curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] );
				if ( $data = curl_exec( $curl ) ) {
					if ( $image = @imagecreatefromstring( $data ) ) { //Mute errors because we're not loading the all image
						if ( $image_width = imagesx( $image ) ) {
							//We have to fake the image type - For RSS
							$ext = pathinfo( $image_url, PATHINFO_EXTENSION );
							switch(strtolower( $ext ) ) {
								case 'gif':
									$type = 1;
									break;
								case 'jpg':
								case 'jpeg':
									$type = 2;
									break;
								case 'png':
									$type = 3;
									break;
								default:
									$type = 2;
									break;
							}
							$image_size = array( $image_width, imagesy( $image ), $type, '' );
						} else {
							$image_size = false;
						}
					} else {
						$image_size = false;
					}
				} else {
					$image_size = false;
				}
				curl_close( $curl );
			} else {
				if ( intval( ini_get( 'allow_url_fopen' ) ) == 1 ) {
					$image_size = getimagesize( $image_url );
				} else {
					$image_size = false;
				}
			}
		} else {
			$image_size = getimagesize( $image_url );
		}
		$this->fb_image_size = $image_size;
		
		return $image_size;
	
	}

	/**
	 * Check if Subheading plugin is active
	 *
	 * @since    1.0
	 */
	private function is_subheading_plugin_active() {

		if ( class_exists( 'SubHeading' ) && function_exists( 'get_the_subheading' ) ) {
			return true;
		}
		
		return false;
	
	}

	/**
	 * Add option for excerpt for pages
	 *
	 * @since    1.0
	 */
	public function add_excerpts_to_pages() {
	     
	     add_post_type_support( 'page', 'excerpt' );

	}

}
