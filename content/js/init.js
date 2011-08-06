function fixedSidebar (sidebar){
		var fixed = false;
		var $bar = $(sidebar).removeClass('fixed');
		var $parent = $bar.parent();
		var top = $bar.offset().top - parseInt( $bar.css('margin-top'), 10 );
		var height = $bar.outerHeight();

		$(window).unbind('scroll').bind('scroll', function(){
			var parent_offset = ($parent.offset().top + $parent.height()) - (height + 10);
			var offset = window.pageYOffset;
			var main_content = window.innerHeight/2;

			$('#container .anchor-item').each(function(index){
				var t = $(this).offset().top - offset;
				if ( t <= main_content) {
					$bar.find('li').removeClass('selected');
					$bar.find('li:eq(' + index + ')').addClass('selected');
				}
			});
			
			if (offset >= parent_offset) {
				$bar.removeClass('fixed').addClass('static');
				fixed = false;
				return;
			}

			if (!fixed && offset >= top) {
				$bar.removeClass('static').addClass('fixed');
				fixed = true;
			}

			if (fixed && offset <= top) {
				$bar.removeClass('static').removeClass('fixed');
				fixed = false;
			}
		});

		$(window).scroll();
	}


$(document).ready(function() {
	
	switch ($('body').data('page'))	{
		case 'home':
			$('#slider').easySlider({
				controlsPlace:	'#banner footer',
				controlsFade:	true,
				auto:			true,
				continuous:		true,
				numeric: false
			});			
		break;
		case 'company':
			fixedSidebar('#scroll');
			$('#left-sidebar .content').localScroll();
		break;
		case 'site':
			fixedSidebar('#scroll');
		break;
		case 'gallery':
			fixedSidebar('#scroll');
			//galeria
			$("#pikaname").PikaChoose({
				thumbOpacity: 0.4,
				hoverPause: true,
				transition: [4]
			});
		break;
	}
	
	$('body').addClass('js-finished');
});