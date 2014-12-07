    $(document).ready(function(){
			$('a[href^="#"]').bind('click.smoothscroll',function (e) {
				e.preventDefault();

				var target = this.hash,
				$target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
					}, 900, 'swing', function () {
					window.location.hash = target;
					});
			});		
			

			var $menu = $("#menu_top");
            
			$(window).scroll(function(){
				if ( $(this).scrollTop() > 600 && $menu.hasClass("default") ){
					$menu.slideUp('slow',function(){
						$(this).removeClass("default")
							   .addClass("fixed transbg")
							   .slideDown('slow');
					});
				} else if($(this).scrollTop() <= 700 && $menu.hasClass("fixed")) {
					$menu.slideUp('slow',function(){
						$(this).removeClass("fixed transbg")
							   .addClass("default")
							   .slideDown('slow');
					});
				}
			});//scroll
            
//  $('.text_block_emotion').fadeThis({speed: 1000});


	});//jQuery
	
	