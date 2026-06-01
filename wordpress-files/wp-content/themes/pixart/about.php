<?php /* Template Name: О Компании */ ?>
<?php get_template_part( 'header' ); ?>

	<div id="about">
		<div class="about">
			<div class="about-content">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<div class="about-title"><h1><?php the_title(); ?></h1></div>
					<div class="about-article">

						<div class="document">
							<?php the_content(); ?>
						</div>

					</div>

					<div class="about-company">
						<h2>Наші клієнти</h2>

						<div id="block-1">

							<div class="block-1">
								<img src="<?php bloginfo('template_url'); ?>/images/15.png" alt=""/>
								<h3>ЖК «Новопечерські Липки»</h3>
							</div>

							<div class="block-1">
								<img src="<?php bloginfo('template_url'); ?>/images/16.png" alt=""/>
								<h3>ЖК «Бульвар Фонтанів»</h3>
							</div>

							

							<div style="clear:both;"></div>

							

							<div class="block-1">
								<img src="<?php bloginfo('template_url'); ?>/images/61.png" alt=""/>
								<h3>АТЗТ «Миронівський хлібопродукт»</h3>
							</div>

							<div class="block-1">
								<img src="<?php bloginfo('template_url'); ?>/images/62.png" alt="" style="width: 149px; height: 140px; margin: -20px auto;"/>
								<h3>ТОВ «Єристівський ГЗК»</h3>
							</div>

						</div>
					</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>

			<div class="service-sidebar">
				<div class="block-1">
					<div class="img"><img src="<?php bloginfo('template_url'); ?>/images/300.jpg" alt=""/></div>
					<p>Уточнюйте подробиці по телефону або залиште заявку і наш менеджер зв'яжеться з вами</p>

					<p class="city">м.Київ: +38 044 466 61 65</p>


					<a href="#modal3" class="open-popup">Залишити заявку</a>
				</div>

			</div>
		</div>
	</div>

	<script>
		var owl = $('.owl-carousel');
			owl.owlCarousel({
			margin: 2,
			items:1,
			loop: true,
			nav: true,
			autoplay:true,
			autoplayHoverPause:true,
			responsive: {
			  1000: {
				items: 1
			  }
			}
		  })
	</script>

<?php get_template_part( 'footer' ); ?>