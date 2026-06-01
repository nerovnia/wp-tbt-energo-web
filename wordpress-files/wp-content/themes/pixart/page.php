<?php get_template_part( 'header' ); ?>

	<div id="blog">
		<div class="blog">
			<div class="blog-content">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<div class="blog-article single-article">
					<article>
					
						<h1><?php the_title(); ?></h1>
							
						<div class="document">
							<?php the_content(); ?>
						</div>
						
					</article>
				</div>
				<?php endwhile; ?>
				<?php endif; ?>	
			</div>
		</div>
	</div>

<?php get_template_part( 'footer' ); ?>