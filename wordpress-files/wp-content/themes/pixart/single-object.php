<?php get_template_part( 'header' ); ?>

	<div id="work-single">
		<div class="work-single">
			<h1><?php the_title(); ?></h1>
			<div class="work-single-content">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<div class="work-single-article">
					<article>
						<div class="content">
							<div class="document">
								<?php the_content(); ?>
							</div>
						</div>		
						
						<div class="owl-carousel">
							<? $images = get_field('gallery');
									if( $images ): ?>
									
									<?php foreach( $images as $image ): ?>	
										<div class="item">
											<a class="fancybox" data-fancybox-group="thumb2" href="<?php echo $image['sizes']['large']; ?>">
											<img src="<?php echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt']; ?>" /><span></span>
											</a>
										</div>
									<?php endforeach; ?>
								<?php endif; ?>
						</div>
					
						
					</article>
				</div>
				<?php endwhile; ?>
				<?php endif; ?>	
			</div>
		</div>
	</div>
	
	<script>
		var owl = $('.owl-carousel');
			owl.owlCarousel({
			margin: 3,
			items:2,
			loop: true,
			nav: true,
			autoplay:true,
			autoplayHoverPause:true,
			responsive: {
			  1000: {
				items: 3
			  },
			  
			   0: {
				items: 1
			  }
			}
		  })
	</script>

<?php get_template_part( 'footer' ); ?>