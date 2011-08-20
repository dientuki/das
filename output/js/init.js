function fixedSidebar(sidebar){
	
		if ($.browser.msie) {
			if (parseInt($.browser.version)== 6) {	return false; }
		}
	
		var fixed = false;
		var $bar = $(sidebar).removeClass('fixed');
		var $parent = $bar.parent();
		var top = $bar.offset().top - parseInt( $bar.css('margin-top'), 10 );
		var height = $bar.outerHeight();

		$(window).unbind('scroll').bind('scroll', function(){
			var parent_offset = ($parent.offset().top + $parent.height()) - (height + 10);
			var offset = window.pageYOffset;
			if (offset == undefined) {
				offset = document.documentElement.scrollTop;
			}
			var main_content = window.innerHeight/2;
			if (isNaN(main_content)) {
				main_content = document.documentElement.clientHeight/2;
			}

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

function slideSwitch(e) {
	var $main = $(e);
	
    var $active = $main.find('.active');

    if ($active.length === 0) $active = $main.children(':last');

    var $next = $active.next().length ? $active.next() : $main.children(':first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}


$(document).ready(function() {
	
	//setInterval( "slideSwitch('#header .tagline')", 2000 );
	//setInterval( "slideSwitch('#header .tagline')", 2000 );
	
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
			$('#scroll').localScroll();
		break;
		case 'site':
			fixedSidebar('#scroll');
		break;
		case 'gallery':
			fixedSidebar('#scroll');
			$("#gallery").PikaChoose({
				thumbOpacity: 0.4,
				hoverPause: true,
				transition: [4]
			});
		break;
	}

	if ($.browser.msie) {
		if (parseInt($.browser.version)== 6) {
			$("#header nav li:first").addClass('first-child');
			$('#container aside').css('height', $('#container .main-content').height());
		}
	}
	
	$('body').addClass('js-finished');
});