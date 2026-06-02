<?php
//Мусор в шапке
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

function at_remove_dup_canonical_link() {
        return false;
}
add_filter( 'wpseo_canonical', 'at_remove_dup_canonical_link' );

remove_action('wp_head','feed_links_extra', 3); 
remove_action('wp_head','feed_links', 2); 
remove_action('wp_head','rsd_link');  
remove_action('wp_head','wlwmanifest_link'); 
remove_action('wp_head','wp_generator');  

remove_action('wp_head','start_post_rel_link',10,0);
remove_action('wp_head','index_rel_link');
remove_action('wp_head','rel_canonical');
remove_action( 'wp_head','adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action( 'wp_head','wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );

//Миниатюра
add_theme_support('post-thumbnails');

//Меню
register_nav_menus(array(
  'header-menu' => 'Меню в шапке'
 ));
  
//Навигация
function wp_corenavi() {
global $wp_query, $wp_rewrite;
$pages = '';
$max = $wp_query->max_num_pages;
if (!$current = get_query_var('paged')) $current = 1;
$a['base'] = str_replace(999999999, '%#%', get_pagenum_link(999999999));
$a['total'] = $max;
$a['current'] = $current;
$total = 1;
$a['mid_size'] = 3;
$a['end_size'] = 1;
$a['prev_text'] = '« Предыдущая';
$a['next_text'] = 'Следующая »';
if ($max > 1) echo '';
if ($total == 1 && $max > 1)
$pages = ''."\r\n";
echo $pages . paginate_links($a);
if ($max > 1) echo '';	
}

//Сайдбары
register_sidebar( array(
'name' => 'Sidebar для Голосований',
'id' => 'sidebar-golos',
'before_widget' => '<div id="%1$s" class="sidebar-content">',
'after_widget' => '</div>',
'before_title' => '<h3 class="sidebar-title">',
'after_title' => '</h3>'
) );

//Php-код в виджетах
function php_in_widgets($widget_content) {
if (strpos($widget_content, '<' . '?') !== false) {
ob_start();
eval('?' . '>' . $widget_content);
$widget_content = ob_get_contents();
ob_end_clean();
}
return $widget_content;
}
add_filter('widget_text', 'php_in_widgets', 99);
add_filter('widget_text', 'do_shortcode');

//Краткое описание 
function new_excerpt_length($length) {
	return 22;
}
add_filter('excerpt_length', 'new_excerpt_length');

add_filter('excerpt_more', function($more) {
	return '...';
});

// Add Volodymyr Nerovnia 01.06.2026
function tbt_register_native_gallery() {
    $args = array(
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-portfolio', // Nice portfolio briefcase icon
        'label'              => 'Галерея робіт',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest'       => true, // Enables the modern Block/Gutenberg editor
    );

    // REPLACE 'your_found_slug' WITH THE EXACT NAME FROM STEP 1
    register_post_type( 'object', $args );
}
add_action( 'init', 'tbt_register_native_gallery' );

?>