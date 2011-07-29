function fixedSidebar (sidebar){
		var fixed = false;
		var $bar = $(sidebar).removeClass('fixed');
		var $parent = $bar.parent();
		var top = $bar.offset().top - parseInt( $bar.css('margin-top'), 10 );
		var height = $bar.outerHeight();

		$(window).unbind('scroll').bind('scroll', function(e){
			var parent_offset = ($parent.offset().top + $parent.height()) - (height + 10);
			var offset = window.pageYOffset;
			var main_content = window.innerHeight/2;

			$bar.find('.anchor-item').each(function(index){
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
				controlsShow:	false,
				controlsFade:	false,
				auto:			true,
				continuous:		true
			});			
		break;
		case 'company':
			fixedSidebar('#left-sidebar ul');
			$('#left-sidebar ul').localScroll();
		break;
		case 'work':
			fixedSidebar('#left-sidebar ul');
		break;
		case 'service':
			fixedSidebar('#left-sidebar ul');
		break;
		case 'work-gallery':
			fixedSidebar('#left-sidebar ul');
			//galeria
		break;
		case 'service-gallery':
			//galeria
		break;	
	}
	
	$('body').addClass('js-finished');
});