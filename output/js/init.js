function fixedSidebar (sidebar){
		var fixed = false;
		var $bar = $(sidebar).removeClass('fixed');
		var $parent = $bar.parent();
		var top = $bar.offset().top - parseInt( $bar.css('margin-top'), 10 );
		var height = $bar.outerHeight();

		$(window).unbind('scroll').bind('scroll', function(e){
			var parent_offset = ($parent.offset().top + $parent.height()) - (height + 10);
			var offset = window.pageYOffset;
			
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

	$('#slider').easySlider({
		controlsShow:	false,
		controlsFade:	false,
		auto:			true,
		continuous:		true
	});
	
	switch ($('body').attr('id'))	{
		case 'company':
			fixedSidebar('#left-sidebar ul');
		  break;
	}
	
	$('body').addClass('js-finished');
});