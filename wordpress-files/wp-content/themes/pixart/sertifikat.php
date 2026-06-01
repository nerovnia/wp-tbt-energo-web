<?php /* Template Name: Сертификаты */ ?>
<?php get_template_part( 'header' ); ?>

<div id="sertifikat">
	<div class="sertifikat">
		<div class="page-sertifikat">
			<h1><?php the_title(); ?></h1>
			
			<div class="row-2">
				<h2>Сертифікація General Electric</h2>
				<div class="owl-carousel">
					<?php if( have_rows('sertif_1') ):
					while( have_rows('sertif_1') ) : the_row();	
					$image3 = get_sub_field('img');
					?>
					
					<div class="item">
						<div class="item-1">
							<a class="fancybox" data-fancybox-group="thumb2" href="<?php echo $image3['url']; ?>">
							<img src="<?php echo $image3['url']; ?>" alt="">
							</a>
						</div>
					</div>
					
				<?php endwhile; endif; ?>
				</div>
			</div>
			
			<div class="row-2">
				<h2>Сертифікація ЕТІ</h2>
				<div class="owl-carousel-2">
					<?php if( have_rows('sertif_2') ):
					while( have_rows('sertif_2') ) : the_row();	
					$image2 = get_sub_field('img');
					?>
					
					<div class="item">
						<div class="item-1">
							<a class="fancybox" data-fancybox-group="thumb2" href="<?php echo $image2['url']; ?>">
							<img src="<?php echo $image2['url']; ?>" alt="">
							</a>
						</div>
					</div>
					
				<?php endwhile; endif; ?>
				</div>
			</div>
			
			<div class="row-2">
				<h2>Сертифікація ІЕК</h2>
				<div class="owl-carousel-3">
					<?php if( have_rows('sertif_3') ):
					while( have_rows('sertif_3') ) : the_row();	
					$image2 = get_sub_field('img');
					?>
					
					<div class="item">
						<div class="item-1">
							<a class="fancybox" data-fancybox-group="thumb2" href="<?php echo $image2['url']; ?>">
							<img src="<?php echo $image2['url']; ?>" alt="">
							</a>
						</div>
					</div>
					
				<?php endwhile; endif; ?>
				</div>
			</div>
			
		</div>
	</div>
</div>

	<script>
		var owl = $('.owl-carousel');
			owl.owlCarousel({
			margin: 2,
			items:4,
			loop: true,
			nav: false,
			autoplay:false,
			autoplayHoverPause:true,
			responsive: {
			  1000: {
				items: 4
			  }
			}
		  })
		  
		  var owl = $('.owl-carousel-2');
			owl.owlCarousel({
			margin: 2,
			items:4,
			loop: true,
			nav: true,
			autoplay:true,
			autoplayHoverPause:true,
			responsive: {
			  1000: {
				items: 4
			  },
			  
			   0: {
				items: 1
			  }
			}
		  })
		  
		  var owl = $('.owl-carousel-3');
			owl.owlCarousel({
			margin: 2,
			items:4,
			loop: true,
			nav: true,
			autoplay:true,
			autoplayHoverPause:true,
			responsive: {
			 1000: {
				items: 4
			  },
			  
			   0: {
				items: 1
			  }
			}
		  })
	</script>

<?php get_template_part( 'footer' ); ?>