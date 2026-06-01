"function" != typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
})

jQuery(document).ready(function() {
    jQuery('#heateor_ogmt_meta_trailing_slash').click(function(){
        if(jQuery(this).is(':checked')){
            jQuery('#heateor_ogmt_trailing_slash').css('display', 'block');
        }else{
            jQuery('#heateor_ogmt_trailing_slash').css('display', 'none');
        }
    });

    jQuery('#heateor_ogmt_enable_fb_publisher').click(function(){
        if(jQuery(this).is(':checked')){
            jQuery('#heateor_ogmt_enable_fb_publisher_row').css('display', 'table-row');
        }else{
            jQuery('#heateor_ogmt_enable_fb_publisher_row').css('display', 'none');
        }
    });

    jQuery('#heateor_ogmt_twitter_website_username').click(function(){
        if(jQuery(this).is(':checked')){
            jQuery('#heateor_ogmt_twitter_website_username_row').css('display', 'table-row');
        }else{
            jQuery('#heateor_ogmt_twitter_website_username_row').css('display', 'none');
        }
    });

    jQuery('#heateor_ogmt_enable_fb_locale').click(function(){
        if(jQuery(this).is(':checked')){
            jQuery('#heateor_ogmt_enable_fb_locale_row').css('display', 'table-row');
        }else{
            jQuery('#heateor_ogmt_enable_fb_locale_row').css('display', 'none');
        }
    });
    
    jQuery('#heateor_ogmt_google_publisher').click(function(){
        if(jQuery(this).is(':checked')){
            jQuery('#heateor_ogmt_google_publisher_row').css('display', 'table-row');
        }else{
            jQuery('#heateor_ogmt_google_publisher_row').css('display', 'none');
        }
    });

    jQuery('#heateor_ogmt_home_meta_description').change(function(){
        if(jQuery(this).val() == 'custom'){
            jQuery('#heateor_ogmt_home_description_custom').css('display', 'block');
        }else{
            jQuery('#heateor_ogmt_home_description_custom').css('display', 'none');
        } 
    });

    jQuery('#heateor_ogmt_default_image_upload').click(function(){
        tb_show('',"media-upload.php?type=image&TB_iframe=true");
    });

    window.send_to_editor = function(html) {
        var defaultImageUrl = jQuery('<div>'+html+'</div>').find('img').attr('src');
        jQuery("input#heateor_ogmt_default_image").val(defaultImageUrl);
        tb_remove();
    }
})