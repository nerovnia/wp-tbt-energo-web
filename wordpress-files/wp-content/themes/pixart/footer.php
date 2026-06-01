<div id="footer">
	<div class="footer">
		<div class="col-1">
			<h2>Наші контакти:</h2>
			<p class="street">м.Київ, вул. Кирилівська, 69</p>
			<p class="phone">+38 044 466 61 65</p>
			<p class="email">tbt.energo@gmail.com</p>
		</div>
		
		<div class="col-2">
			<h2>Залишилися питання?</h2>
			<p>Наш менеджер відповість на них</p>
			<a href="#modal3" class="open-popup">Поставити питання</a>
		</div>
		
		<div class="col-3">
			<p>Copyright © 2020 - «ТБТ Енерго» <br/>Всі права захищені</p>
			<div class="dev">Сайт розроблений: <a href="http://www.pixart.agency/" target="_blank">pixart.agency</a></div>
			
		</div>
	</div>
</div>


	<div id="overlay">
		<div class="popup-close-bg"></div>	
		
		<div id="modal1" class="popup">
			<span class="popup-close"></span>
				<form action="<?php bloginfo('template_url'); ?>/form.php" method="POST">
					<h2>Замовлення зворотнього дзвінка</h2>
					<h3>Введіть ваше ім'я та телефон. Фахівець компанії «ТБТ Енерго» зв'яжеться з вами для консультації</h3>
			
					<div class="in-1">
					<p>Введіть ваше ім'я*</p>
					<input type="text" name="name" required> 
					</div>
					<div class="in-1">
					<p>Введіть ваш телефон*</p>
					<input type="text" name="phone" required>
					</div>
					<input type="hidden" name="info" value="Замовити дзвінок"> 
					<input type="submit" value="Замовити дзвінок" class="submit">
				</form>
			
		</div>
		<!---->
		<div id="modal2" class="popup">
			<span class="popup-close"></span>
				<form action="<?php bloginfo('template_url'); ?>/form.php" method="POST">
					<h2>Безкоштовний розрахунок вартості вашого проекту</h2>
					<h3>Введіть ваше ім'я та телефон. Фахівець компанії «ТБТ Енерго» зв'яжеться з вами для уточнення деталей </h3>
			
					<div class="in-1">
					<p>Введіть ваше ім'я*</p>
					<input type="text" name="name" required> 
					</div>
					<div class="in-1">
					<p>Введіть ваш телефон *</p>
					<input type="text" name="phone" required>
					</div>
					<input type="hidden" name="info" value="Отримати розрахунок"> 
					<input type="submit" value="Отримати розрахунок" class="submit">
				</form>
		</div>
		
		<!---->
		<div id="modal3" class="popup">
			<span class="popup-close"></span>
				<form action="<?php bloginfo('template_url'); ?>/form.php" method="POST">
					<h2>Безкоштовна консультація</h2>
					<h3>Введіть ваше ім'я та телефон. Фахівець компанії «ТБТ Енерго» зв'яжеться з вами для консультації</h3>
			
					<div class="in-1">
					<p>Введіть ваше ім'я*</p>
					<input type="text" name="name" required> 
					</div>
					<div class="in-1">
					<p>Введіть ваш телефон *</p>
					<input type="text" name="phone" required>
					</div>
					<input type="hidden" name="info" value="Отримати консультацію"> 
					<input type="submit" value="Отримати консультацію" class="submit">
				</form>
		</div>
		
		<!---->
		<div id="modal4" class="popup">
			<span class="popup-close"></span>
				<form action="<?php bloginfo('template_url'); ?>/form.php" method="POST">
					<h2>Безкоштовний розрахунок вартості вашого проекту</h2>
					<h3>Введіть ваше ім'я та телефон. Фахівець компанії «ТБТ Енерго» зв'яжеться з вами для уточнення деталей</h3>
			
					<div class="in-1">
					<p>Введіть ваше ім'я*</p>
					<input type="text" name="name" required> 
					</div>
					<div class="in-1">
					<p>Введіть ваш телефон *</p>
					<input type="text" name="phone" required>
					</div>
					<input type="hidden" name="info" id="main-1-title" value=""> 
					<input type="submit" value="Отримати розрахунок" class="submit">
				</form>
		</div>
		
	</div>

	<script>
		function main1(title) {
			document.getElementById('main-1-title').value = title;
		}
	</script>
	
	<script>
		$(document).ready(function() {
				var overlay = $('#overlay');
				var open_modal = $('.open-popup'); 
				var close = $('.popup-close, .popup-close-bg'); 
				var modal = $('.popup'); 

				 open_modal.click( function(event){ 
					 event.preventDefault(); 
					 var div = $(this).attr('href'); 
					 overlay.fadeIn(400, 
						 function(){ 
							 $(div)
								 .css('display', 'block') 
								 .animate({opacity: 1}, 200); 
					 });
				 });

				 close.click( function(){ 
						modal 
						 .animate({opacity: 0}, 200, 
							 function(){ 
								 $(this).css('display', 'none');
								 overlay.fadeOut(200); 
							 }
						 );
				 });
			});
	</script>
	<script>
		$('document').ready(function () {
			$('form').submit(function(e) {

				var ref = $(this).find("[required]");

				$(ref).each(function(){
					if ( $(this).val() == '' )
					{
						
						$(this).focus();

						e.preventDefault();
						return false;
					}
				});  return true;
			});
		});
	</script>


<?php wp_footer(); ?>
</body>
</html>