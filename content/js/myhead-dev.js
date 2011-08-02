head.js('js/libs/jquery-1.6.2-min.js',
		'js/init.js');
/*
'js/plugins/easySlider1.7.js',
'js/plugins/jquery-scrollTo-1.4.2-min.js',
'js/plugins/jquery-localscroll-1.2.7-min.js',
*/

if (head.browser.ie)  {
	if (parseInt(head.browser.version) <= 6)   {
		head.js('plugins/selectivizr-min.js','js/css-fix.js');
		head.js('js/libs/dd_belatedpng.js','js/pngfix.js');
	}
}
