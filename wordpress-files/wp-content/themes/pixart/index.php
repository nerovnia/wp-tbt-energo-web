<?php get_template_part( 'header' ); ?>
	<div id="blog">
		<div class="blog">
			<div class="blog-content">
			<h1 class="blog-title">Новини</h1>
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<div class="blog-article">
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					
						<div class="img">
							<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" >
								<?php the_post_thumbnail(); ?>
							</a>
						</div>
						
						<div class="content">
							<div class="date"><?php the_time('d.m.Y') ?></div>	
							
							<a href="<?php the_permalink(); ?>">
								<h2><?php the_title(); ?></h2>
							</a>
							
							<div class="anonce">
							<?php the_excerpt(); ?>
							</div>
												
							<div class="more">
								<a href="<?php the_permalink(); ?>">Читати повністю</a>
							</div>
						</div>
						
					</article>
				</div>
				<?php endwhile; ?>
					<div class="page_navigation">
						<?php if (function_exists('wp_corenavi')) wp_corenavi(); ?>
					</div>
				<?php endif; ?>	
			</div>
		</div>
	</div>
<?php get_template_part( 'footer' ); ?>