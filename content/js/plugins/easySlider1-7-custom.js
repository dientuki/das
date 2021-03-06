/*
 * 	Easy Slider 1.7 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	markup example for $("#slider").easySlider();
 *	
 * 	<div id="slider">
 *		<ul>
 *			<li><img src="images/01.jpg" alt="" /></li>
 *			<li><img src="images/02.jpg" alt="" /></li>
 *			<li><img src="images/03.jpg" alt="" /></li>
 *			<li><img src="images/04.jpg" alt="" /></li>
 *			<li><img src="images/05.jpg" alt="" /></li>
 *		</ul>
 *	</div>
 *
 */

(function($) {

	$.fn.easySlider = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			controlsPlace:  false,
			controlsId:     'controls',
			controlsFade:	true,
			firstId: 		'firstBtn',
			firstText: 		'First',
			firstShow:		false,
			lastId: 		'lastBtn',	
			lastText: 		'Last',
			lastShow:		false,				
			vertical:		false,
			speed: 			800,
			auto:			true,
			pause:			2000,
			continuous:		false, 
			numeric: 		false
		}; 
				
		var options = $.extend(defaults, options);  
				
		this.each(function() {  
			var $obj = $(this);
			var $lis = $obj.find("li");
			var $ul = $obj.find("ul");	
			var s = $lis.length;
			var w = $lis.width(); 
			var h = $lis.height(); 
			var clickable = true;
			$obj.width(w); 
			$obj.height(h); 
			$obj.css("overflow","hidden");
			$ul.css('width',s*w)
			var ts = s-1;
			var t = 0;
			
			if(options.continuous){
				$ul.prepend($("ul li:last-child",$obj).clone().css("margin-left","-"+ w +"px"));
				$ul.append($("ul li:nth-child(2)",$obj).clone());
				$ul.css('width',(s+1)*w);
				$lis = $obj.find("li");
			};			
			
			if(!options.vertical) {
				$lis.css('float','left');
			}
			
			if(options.controlsPlace != false){ //have control
				var html = new Array();
				html[0] = '<ol id="' + options.controlsId + '" class="clearfix">';
				
				for (var i=1; i<=s; i++){
					if(options.numeric){
						html[i] = '<li><a href="#" data-id="' + i + '">' + i + '</a></li>'
					} else {
						html[i] = '<li><a href="#" data-id="' + i + '">&nbsp;</a></li>'
					}
					
				}
				html[html.length] = '</ol>';
				var $control = $(options.controlsPlace);
				$control.append(html.join('\n'));
				
				$control.find('a').live('click', function(){
					animate(  $(this).data('id') - 1,  true);
					return false;
				})
			}
			
			/*
			if(options.controlsPlace != false){
				var html = new Array();				
				if(options.numeric){
					html[0] += '<ol id="'+ options.numericId +'"></ol>';
				} else {
					if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"javascript:void(0);\">'+ options.firstText +'</a></span>';
					html += ' <span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span>';
					html += ' <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>';
					if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"javascript:void(0);\">'+ options.lastText +'</a></span>';				
				};
				
				html += options.controlsAfter;						
				$(obj).after(html);										
			};
			
			if(options.numeric){									
				for(var i=0;i<s;i++){						
					$(document.createElement("li"))
						.attr('id',options.numericId + (i+1))
						.html('<a rel='+ i +' href=\"javascript:void(0);\">'+ (i+1) +'</a>')
						.appendTo($("#"+ options.numericId))
						.click(function(){							
							animate($("a",$(this)).attr('rel'),true);
						}); 												
				};							
			} else {
				$("a","#"+options.nextId).click(function(){		
					animate("next",true);
				});
				$("a","#"+options.prevId).click(function(){		
					animate("prev",true);				
				});	
				$("a","#"+options.firstId).click(function(){		
					animate("first",true);
				});				
				$("a","#"+options.lastId).click(function(){		
					animate("last",true);				
				});				
			};
			*/
			function setCurrent(i){
				if(options.controlsPlace != false) {
					i = parseInt(i);
					$control.find('li').removeClass("current");
					$control.find('li:eq(' + i + ')').addClass("current");		
				}
			};
			
			function adjust(){
				if(t>ts) t=0;		
				if(t<0) t=ts;	
				if(!options.vertical) {
					$ul.css("margin-left",(t*w*-1));
				} else {
					$ul.css("margin-left",(t*h*-1));
				}
				clickable = true;
				setCurrent(t);
			};
			
			function animate(dir,clicked){
				if (clickable){
					clickable = false;
					var ot = t;		
					switch(dir){
						case "next":
							//t = (ot>=ts) ? (options.continuous ? t+1 : ts) : t+1;	
							t = (ot>=ts) ? (options.continuous ? 0 : ts) : t+1;	
							break; 
						case "prev":
							t = (t<=0) ? (options.continuous ? t-1 : 0) : t-1;
							break; 
						case "first":
							t = 0;
							break; 
						case "last":
							t = ts;
							break; 
						default:
							t = dir;
							break; 
					};	
					var diff = Math.abs(ot-t);
					var e = s - 1;
					var speed = diff*options.speed;
					if (diff == e) {
						speed = options.speed;
					}
					if(!options.vertical) {
						p = (t*w*-1);
						$ul.animate(
							{ marginLeft: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);				
					} else {
						p = (t*h*-1);
						$ul.animate(
							{ marginTop: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);					
					};
					/*
					if(!options.continuous && options.controlsFade){					
						if(t==ts){
							$("a","#"+options.nextId).hide();
							$("a","#"+options.lastId).hide();
						} else {
							$("a","#"+options.nextId).show();
							$("a","#"+options.lastId).show();					
						};
						if(t==0){
							$("a","#"+options.prevId).hide();
							$("a","#"+options.firstId).hide();
						} else {
							$("a","#"+options.prevId).show();
							$("a","#"+options.firstId).show();
						};					
					};				
					*/
					if(clicked) {
						clearTimeout(timeout)
					};
					
					if(options.auto && dir=="next" && !clicked){
						//console.log(diff*options.speed+options.pause)
						timeout = setTimeout(function(){
							animate("next",false);
						},options.speed+options.pause);
					};
			
				};
				
			};
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
			
			setCurrent(0);
			/*
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};
			*/				
			
		});
	  
	};

})(jQuery);



