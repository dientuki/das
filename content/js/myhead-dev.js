head.js('js/libs/jquery-1.6.2-min.js',
		'js/plugins/easySlider1.7.js',
		'js/init.js');

if (head.browser.ie)  {
	if (parseInt(head.browser.version) <= 6)   {
		head.js('plugins/selectivizr-min.js','js/css-fix.js');
		head.js('js/libs/dd_belatedpng.js','js/pngfix.js');
	}
}