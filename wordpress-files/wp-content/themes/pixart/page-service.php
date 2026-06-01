<?php /* Template Name: Услуги */ ?>
<?php get_template_part( 'header' ); ?>

	<div id="service">
		<div class="service">
			<div class="service-content">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<div class="service-title"><h1><?php the_title(); ?></h1></div>
					<div class="service-article">
							
						<div class="document">
							<?php the_content(); ?>
						</div>
		
					</div>
					<?php endwhile; ?>
				<?php endif; ?>	
				
				<div class="service-form">
					<div class="col-1">
						<h2>Заявка на послугу «<?php the_title(); ?>»</h2>
						<p>Введіть ваші дані на безкоштовний розрахунок вашого проекту і наш менеджер зв'яжеться з вами найближчим часом</p>
					</div>
					
					<div class="col-2">
						<form action="<?php bloginfo('template_url'); ?>/form.php" method="POST">
							<input type="text" name="name" placeholder="Введіть ваше ім'я*" required> 
							<input type="text" name="phone" placeholder="Введіть ваш телефон*" required>
							<input type="hidden" name="info" value="Заявка на послугу «<?php the_title(); ?>»"> 
							<input type="submit" value="Залишити заявку" class="submit">
						</form>
					</div>
				</div>
			</div>
			
			<div class="service-sidebar">
				<div class="block-1">
					<div class="img"><img src="<?php bloginfo('template_url'); ?>/images/300.jpg" alt=""/></div>
					<p>Уточнюйте подробиці по телефону або залиште заявку і наш менеджер зв'яжеться з вами</p>

					<p class="city">м.Київ: +38 067 487 52 08</p>
					

					<a href="#modal3" class="open-popup">Залишити заявку</a>
				</div>
				
			</div>
		</div>
	</div>

<?php get_template_part( 'footer' ); ?>