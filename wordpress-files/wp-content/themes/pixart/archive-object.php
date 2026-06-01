<?php get_template_part( 'header' ); ?>

<div id="work-page">
	<div class="work-page">
		<div class="work-page-content">
			<h1>Галерея робіт</h1>
			<?php if (have_posts()) :
				while (have_posts()) : the_post(); ?>
		
					<article class="work-page-list">

						<div class="images">
							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail(); ?>
							</a>
						</div>
						
						<a href="<?php the_permalink(); ?>">
							<h2><?php the_title(); ?></h2>
						</a>
						
						<div class="work-anonce">
							<?php the_excerpt(); ?>
						</div>
						
						<div class="read-more-link">
							<a href="<?php the_permalink(); ?>" class="read-more">
								Дивитись об'єкт
							</a>
						</div>

					</article>

				<?php endwhile; ?>
					<div class="page-navigation">
						<?php if (function_exists('wp_corenavi')) wp_corenavi(); ?>
					</div>
			<?php endif; ?>
		</div>
	</div>
</div>

<?php get_template_part( 'footer' ); ?>