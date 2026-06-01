var heateorOgmtReferrer = null, heateorOgmtReferrerVal = '', heateorOgmtReferrerTabId = '';
jQuery(document).ready(function() {
	heateorOgmtReferrer = jQuery('input[name=_wp_http_referer]'), heateorOgmtReferrerVal = jQuery('input[name=_wp_http_referer]').val(), heateorOgmtReferrerTabId = location.href.indexOf('#') > 0 ? location.href.substring(location.href.indexOf('#'), location.href.length) : '';
    if(heateorOgmtReferrerTabId){heateorOgmtSetReferrer(heateorOgmtReferrerTabId) }
    jQuery("#tabs").tabs(), jQuery("#heateor_ogmt_login_redirection_column").find("input[type=radio]").click(function() {
        jQuery(this).attr("id") && "heateor_ogmt_login_redirection_custom" == jQuery(this).attr("id") ? jQuery("#heateor_ogmt_login_redirection_url").css("display", "block") : jQuery("#heateor_ogmt_login_redirection_url").css("display", "none")
    }), jQuery(".heateor_ogmt_help_bubble").attr("title", heateorOgmtHelpBubbleTitle), jQuery(".heateor_ogmt_help_bubble").click(function() {
        jQuery("#" + jQuery(this).attr("id") + "_cont").toggle()
    })
    jQuery('#tabs ul a').click(function(){
    	heateorOgmtSetReferrer(jQuery(this).attr('href'));
    });
});
function heateorOgmtSetReferrer(href){
	jQuery(heateorOgmtReferrer).val( heateorOgmtReferrerVal.substring(0, heateorOgmtReferrerVal.indexOf('#') > 0 ? heateorOgmtReferrerVal.indexOf('#') : heateorOgmtReferrerVal.length) + href );
}
jQuery("html, body").animate({ scrollTop: 0 });