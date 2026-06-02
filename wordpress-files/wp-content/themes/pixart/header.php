<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta name=viewport content="width=device-width">
	<meta charset="<?php bloginfo( 'charset' ); ?>" />

	<meta property="og:title" content="ТБТ Энерго">
<meta property="og:site_name" content=" Тут нейм">
<meta property="og:description" content="Виробництво та збирання електрощитового обладнання за індивідуальними і типовими схемами, з гарантією кращої ціни">
<meta property="og:image" content="https://ekfgroup.com/uploads/reshenia/energetika.jpg">
	<meta property="og:url" content="https://tbt-energo.com/">

	<title><?php bloginfo('name'); ?> <?php wp_title('|',true,''); ?></title>

	<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>">
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/pda.css" media="all" />
	<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/images/favicon.png" />
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/owl.carousel.css" media="all" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/jquery.fancybox.css?v=2.1.5" media="screen"/>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/owl.carousel.js"></script>
	<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.fancybox.js?v=2.1.5"></script>

	<script type="text/javascript">
		$(document).ready(function() {
			$('.fancybox').fancybox();
		});
	</script>
	
	<?php wp_head(); ?>
</head>
<body>
	<div id="header">
		<div class="header">
			
			<div class="logo">
				<a href="/"><img src="<?php bloginfo('template_url'); ?>/images/logo.png" alt=""/></a>
			</div>
			
			<div class="contact-2">
				<p>E-mail</p>
				<span>tbt.energo@gmail.com</span> 
				<a href="#modal2" class="open-popup">Розрахунок вартості</a>
			</div>
			<div class="contact">
				<p>Телефон</p>
				<span>+38 (044) 466-61-65</span> 
				<a href="#modal1" class="open-popup">Зворотній дзвінок</a>
			</div>
			<div class="street">
				<p>Адреса</p>
				<span>Україна, м.Київ<br/>
				вул. Кирилівська, 69</span>
			</div>
			<div class="socialb">
				<p><a href="https://www.facebook.com/tbt.energo/"><img src="http://tbt-energo.com/wp-content/uploads/2019/08/facebooklogoincircularbuttonoutlinedsocialsymbol_79822.png" width="30" 
   height="30" alt="Мы в Фейсбуке"></a></p>
			         </div>
		</div>
	</div>
	
	<div id="menu">
		<div class="menu">
				<? wp_nav_menu(array(
				'theme_location' => 'header-menu',
				'items_wrap' => '<ul>%3$s</ul>',
				'container' => ''));
				?>
		</div>
	</div>
	
	<div id="menu-pda">
		<div class="menu-pda">
			<div class="menu-pda-button">Меню</div>
			<div class="menu-pda-content">
				<? wp_nav_menu(array(
				'theme_location' => 'header-menu',
				'items_wrap' => '<ul>%3$s</ul>',
				'container' => ''));
				?>
			</div>
		</div>
	</div>
	
	<script>
   $('.menu-pda-button').click(function() {
    $(this).toggleClass('active').next()[$(this).next().is(':hidden') ? "slideDown" : "slideToggle"](400);
   });
	</script>
