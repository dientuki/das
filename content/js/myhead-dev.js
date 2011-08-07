head.js('js/libs/jquery-1.6.2-min.js',
		'js/plugins/easySlider1-7-custom.js',
		'js/plugins/jquery-scrollTo-1.4.2-min.js',
		'js/plugins/jquery-localscroll-1.2.7-min.js',
		'js/plugins/jquery-pikachoose-full.js',
		'js/init.js');

if (head.browser.ie)  {
	if (parseInt(head.browser.version) <= 6)   {

		head.js('js/libs/dd_belatedpng.js','js/pngfix.js');
	}
}¡