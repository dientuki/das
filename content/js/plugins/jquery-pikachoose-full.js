/*  5/31/2011
		PikaChoose
	Jquery plugin for photo galleries
    Copyright (C) 2011 Jeremy Fry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($) {
    /**
     * Creates a slideshow for all matched elements.
     *
     * @example $("#pikame").PikaChoose();
     * @input needed <ul id="pikame"><li><img src="first.jpg"><span>Caption</span></li><li><img src="second.jpg"><span>Caption</span></li></ul>
     *
     * @method PikaChoose
     * @return $
     * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
     */
 	var defaults = {
		autoPlay: true,
		speed: 5000,
		text: { play: "", stop: "", previous: "Previous", next: "Next" },
		transition:[1],
		showCaption: true,
		IESafe: false,
		showTooltips: false,
		carousel: false,
		carouselVertical: false,
		animationFinished: null,
		buildFinished: null,
		bindFinished: null,
		startOn: 0,
		thumbOpacity: 0.4,
		hoverPause: false,
		thumbName: '-thumb'
	};
   
    $.fn.PikaChoose = function(o) {
		return this.each(function() {
			$(this).data('pikachoose', new $pc(this, o));
		});
	};
	
	/**
     * The PikaChoose object.
     *
     * @constructor
     * @class pikachoose
     * @param e {HTMLElement} The element to create the carousel for.
     * @param o {Object} A set of key/value pairs to set as configuration properties.
     * @cat Plugins/PikaChoose
     */
    $.PikaChoose = function(e, o) {
		this.options    = $.extend({}, defaults, o || {});
		this.list     	= null;
		this.image  	= null;
		this.anchor		= null;
		this.caption	= null;
		this.imgNav		= null;
		this.imgPlay 	= null;
		this.imgPrev	= null;
		this.imgNext 	= null;
		this.textNext	= null;
		this.textPrev	= null;
		this.previous  	= null;
		this.next 		= null;
		this.aniWrap	= null;
		this.aniDiv		= null;
		this.aniImg		= null;
		this.thumbs		= null;
		this.transition	= null;
		this.active		= null;
		this.tooltip	= null;
		this.animating	= false;
		this.stillOut 	= null;
		this.counter	= null;
		this.timeOut	= null;
		if(typeof(this.options.data) != "undefined"){
			//user passed a data source
			e = $("<ul></ul>").appendTo(e);
			$.each(this.options.data,function(){
				if(typeof(this.link) != "undefined"){ 
					var tmp = $("<li><a href='"+this.link+"'><img></a></li>").appendTo(e);
					if(typeof(this.title) != "undefined"){ tmp.find('a').attr('title',this.title); }
				}else{
					var tmp = $("<li><img></li>").appendTo(e);
				}
				if(typeof(this.caption) != "undefined"){ tmp.append("<span>"+this.caption+"</span>"); }
				if(typeof(this.thumbnail) != "undefined"){ 
					tmp.find('img').attr('ref',this.image); 
					tmp.find('img').attr('src',this.thumbnail); 
				}else{
					tmp.find('img').attr('src',this.image); 
				}
			});
		}
		if(e.nodeName == 'UL' || e.nodeName == 'OL' || e instanceof  jQuery) {
            this.list = $(e);
            this.build();
            this.bindEvents();
        }else{
        	return;
        }
		
		var y = 0;
		var x = 0;
		for(var t = 0; t<25;t++){
			var a = '<div col="'+y+'" row="'+x+'"></div>';
			this.aniDiv.append(a);
			y++;
			if(y == 5){
				x++;
				y=0;
			}
		}

    };//end PikaChoose function(e, o)
    
    var $pc = $.PikaChoose;
        $pc.fn = $pc.prototype = {
        pikachoose: '4.3.1'
    };
	
	$.fn.pikachoose = $.fn.PikaChoose;

    $pc.fn.extend = $pc.extend = $.extend;

    $pc.fn.extend({
        /**
         * Builds the gallery structure.
         *
         * @method build
         * @return undefined
         */
        build: function() {
        	this.step 		= 0; //transition step count
       	//create the structure for pikachoose
			//this.wrap 		= $("<div class='pika-stage'></div>").insertBefore(this.list);
        	this.wrap		= this.list.parent().find('.pika-stage');
			this.image 		= $("<img>").appendTo(this.wrap);
			this.imgNav 	= $("<div class='pika-imgnav'></div>").insertAfter(this.image);
			this.imgPlay 	= $("<a></a>").appendTo(this.imgNav);
			this.counter 	= $("<span class='pika-counter'></span>").appendTo(this.imgNav);
			if(this.options.autoPlay){ this.imgPlay.addClass('pause'); }else{ this.imgPlay.addClass('play'); }
			this.imgPrev 	= $("<a class='previous'></a>").insertAfter(this.imgPlay);
			this.imgNext 	= $("<a class='next'></a>").insertAfter(this.imgPrev);
			this.caption 	= this.list.parent().find('.pika-caption');//$("<div class='caption'></div>").insertAfter(this.imgNav).hide();
			if (this.options.tooltip == true) {
				this.tooltip 	= $("<div class='pika-tooltip'></div>").insertAfter(this.list).hide();
			}
			this.aniWrap	= $("<div class='pika-aniwrap'></div>").insertAfter(this.imgNav);
			this.aniImg		= $("<img>").appendTo(this.aniWrap).hide();
			this.aniDiv		= $("<div class='pika-ani'></div>").appendTo(this.aniWrap);
			this.textNav 	= $("<div class='pika-textnav'></div>").insertAfter(this.aniWrap);
			this.textPrev 	= $("<a class='previous'>"+this.options.text.previous+"</a>").appendTo(this.textNav);
			this.textNext	= $("<a class='next'>"+this.options.text.next+"</a>").appendTo(this.textNav);
			//this.list.addClass('pika-thumbs');
        	this.list.children('li').wrapInner("<div class='clip' />");
			this.thumbs = this.list.find('img');
			this.active		= this.thumbs.eq(this.options.startOn);
			//fill in info for first image
			this.finishAnimating({
						'source':this.active.attr('ref') || this.active.attr('src'),
						'caption':this.active.parents('li:first').find('span:first').html(),
						'clickThrough':this.active.parent().attr('href') || "",
						'clickThroughTitle':this.active.parent().attr('title') || ""
			});

			//process all the thumbnails
			var self = this;
			this.thumbs.each(function(){
				self.createThumb($(this),self);
			});
			
			if(typeof(this.options.buildFinished) == 'function'){
	     		this.options.buildFinished(this);
	     	}
			//this.wrap.removeClass('pika-loading');
		}, //end setup
        /**
         * proccesses thumbnails
         *
         * @method createThumb
         * @return undefined
         */
        createThumb: function(ele) {
        	var self = ele;
			var that = this;
        	//self.hide();
        	
			//store all the data with the image
        	$.data(ele[0],'clickThrough',self.parent('a').attr('href') || "");
        	$.data(ele[0],'clickThroughTitle',self.parent('a').attr('title') || "");
        	if(self.parent('a').length > 0){ self.unwrap(); }
        	$.data(ele[0],'caption',self.next('span').html() || "");
			self.next('span').remove();
        	$.data(ele[0],'source',self.attr('ref') || self.attr('src'));
			
			//gets each items index to iterate through them. Thanks to Tushar for the fix.
			$.data(ele[0],'order',self.closest('ul').find('li').index(self.parents('li')));
    		//pass data so it can enter the load scope
    		var data = $.data(ele[0]);
    		$('<img />').bind('load',{data:data},function(){
	    		if(typeof(that.options.buildThumbStart) == 'function'){
		     		that.options.buildThumbStart(that);
		     	}
	    		/*
    			//in this scope self refers to the image
				var img = $(this);
				var w = this.width;
				var h = this.height;
				if(w===0){w = img.attr("width");}
				if(h===0){h = img.attr("height");}
				//grab a ratio for image to user defined settings
				var rw = parseInt(self.parents('.clip').css('width').slice(0,-2))/w;
				var rh = parseInt(self.parents('.clip').css('height').slice(0,-2))/h;
				//determine which has the smallest ratio (thus needing
				//to be the side we use to scale so our whole thumb is filled)
				var ratio;
				if(rw<rh){
					//we'll use ratio later to scale and not distort
					ratio = rh;
					var left = ((w*ratio- parseInt(self.parents('.clip').css('width').slice(0,-2)))/2)*-1;
					left = Math.round(left);
					self.css({left:left});
				}else{
					ratio = rw;
					self.css({top:0});
				}
				//use those ratios to calculate scale
				var width = Math.round(w*ratio);
				var height = Math.round(h*ratio);
				self.css("position","relative");
				var imgcss={
					width: width+"px",
					height: height+"px"
				};
				self.css(imgcss);
				*/
				self.hover(
					function(e){
						clearTimeout(that.stillOut);
						$(this).stop(true,true).fadeTo(250,1);
						if(!that.options.showTooltips){ return; }
						that.tooltip.show().stop(true,true).html(data.caption).animate({top:$(this).parent().position().top, left:$(this).parent().position().left, opacity: 1.0},'fast');
					},
					function(e){
						if(!$(this).hasClass("active")){$(this).stop(true,true).fadeTo(250,that.options.thumbOpacity);
						that.stillOut = setTimeout(that.hideTooltip,700);
					}}
				);

				if(data.order == that.options.startOn){
					self.fadeTo(250,1);
					self.addClass('active');
					self.parents('li').eq(0).addClass('active');
				}else{
					self.fadeTo(250,that.options.thumbOpacity);
				}

				if(typeof(that.options.buildThumbFinish) == 'function'){
		     		that.options.buildThumbFinish(that);
		     	}
    		}).attr('src',self.attr('src'));
        },//end createThumb
		/**
         * proccesses thumbnails
         *
         * @method bindEvents
         * @return undefined
         */
        bindEvents: function() {
        	this.thumbs.bind('click',{self:this},this.imgClick);
        	this.imgNext.bind('click',{self:this},this.nextClick);
        	this.textNext.bind('click',{self:this},this.nextClick);
        	this.imgPrev.bind('click',{self:this},this.prevClick);
        	this.textPrev.bind('click',{self:this},this.prevClick);
        	this.imgPlay.bind('click',{self:this},this.playClick);
        	this.wrap.bind('mouseenter',{self:this},function(e){
        		e.data.self.imgNav.stop(true,true).fadeIn('slow');
				if(e.data.self.options.hoverPause == true){
					clearTimeout(e.data.self.timeOut);
				}
        	});
        	this.wrap.bind('mouseleave',{self:this},function(e){
        		e.data.self.imgNav.stop(true,true).fadeOut('slow');
				if(e.data.self.options.autoPlay == true && e.data.self.options.hoverPause){
					e.data.self.timeOut = setTimeout((function(self){
						return function(){ self.nextClick(); };
					})(e.data.self), e.data.self.options.speed);
				}
        	});
        	if (this.options.tooltip == true) {
				this.tooltip.bind('mouseenter',{self:this},function(e){
					clearTimeout(e.data.self.stillOut);
				});
        	}
        	if (this.options.tooltip == true) {
				this.tooltip.bind('mouseleave',{self:this},function(e){
					e.data.self.stillOut = setTimeout(e.data.self.hideTooltip,700);
				});
        	}
			if(typeof(this.options.bindsFinished) == 'function'){
	     		this.options.bindsFinished(this);
	     	}
        },//end bind event
		/**
         * hides tooltip
         *
         * @method hideTooltip
         * @return undefined
         */
		hideTooltip: function (e){
			$(".pika-tooltip").animate({opacity:0.01});
		},
        /**
         * handles gallery after aclick occurs. and sets active classes
         *
         * @method imgClick
         * @return undefined
         */
	     imgClick: function(e,x) {
	     	var self = e.data.self;
			var data = $.data(this);
	     	if(self.animating){return;}
	     	/*
     		if(typeof(x) == 'undefined' || x.how != "auto"){
	     		//arrive here if natural click

	     		if(self.options.autoPlay){
	     			self.imgPlay.trigger('click');
	     		}
			}else{

				if(self.options.autoPlay == false){
					return false;
				}
			}
			*/
			//self.caption.fadeOut('slow');
	     	self.animating = true;
	     	self.active.fadeTo(300,self.options.thumbOpacity).removeClass('active');
			self.active.parents('.active').eq(0).removeClass('active');
	     	self.active = $(this);
	     	self.active.addClass('active').fadeTo(200,1);
	     	self.active.parents('li').eq(0).addClass('active');
	 		$('<img />').bind('load', {self:self,data:data}, function(){
				//in this scope self referes to the PikaChoose object
				self.aniDiv.css({height:self.image.height(),width:self.image.width()}).fadeIn('fast');
				self.aniDiv.children('div').css({'width':'20%','height':'20%','float':'left'});
		
				//decide our transition
				var n = 0;
				if(self.options.transition[0] == -1){	
					//random
					n = Math.floor(Math.random()*7)+1;
				}else{
					n = self.options.transition[self.step];
					self.step++;
					if(self.step >= self.options.transition.length){self.step=0;}
				}
				if(self.options.IESafe && $.browser.msie){ n = 1; }
				self.doAnimation(n,data);
				
			}).attr('src',$.data(this).source);//end image preload
	     },//end bindEvents
	     doAnimation: function(n,data){
	     		var self = this; //self in this scope refers to PikaChoose object. Needed for callbacks on animations
				self.image.stop(true,false);
				var aWidth = self.aniDiv.children('div').eq(0).width();
				var aHeight = self.aniDiv.children('div').eq(0).height();
				var img = new Image();
				data.source = data.source.replace(this.options.thumbName, '');
				$(img).attr('src',data.source);
				if(img.height != self.image.height() || img.width != self.image.width()){
					//Your images are not the same height? Well you get limited on transitions
					if(n != 0 && n != 1 && n != 7){
						n = 1;
					}
				}
				self.aniDiv.css({height:img.height,width:img.width});
				self.aniDiv.children().each(function(){
					//position myself absolutely
					var div = $(this);
					var xOffset = Math.floor(div.parent().width()/5)*div.attr('col');
					var yOffset = Math.floor(div.parent().height()/5)*div.attr('row');
					div.css({
						'background':'url('+data.source+') -'+xOffset+'px -'+yOffset+'px',
						'width':'0px',
						'height':'0px',
						'position':'absolute',
						'top':yOffset+'px',
						'left':xOffset+'px',
						'float':'none'
					});
				});//end ani_divs.children.each
				self.aniDiv.hide();
				self.aniImg.hide();
				
	     		switch(n){
					case 0:
						//fade out then in
						self.image.stop(true,true).fadeOut('slow',function(){
							self.image.attr('src',data.source).fadeIn('slow',function(){
								self.finishAnimating(data);
							});
						});
	
						break;
					case 1:
						//full frame fade
						self.aniDiv.hide();
						self.aniImg.height(self.image.height()).hide().attr('src',data.source);
						$.when(
							self.image.fadeOut('slow'),
							self.aniImg.eq(0).fadeIn('slow')).done(function(){
							self.finishAnimating(data);
						});
	
						break;
					case 2:
						self.aniDiv.show().children().hide().each(function(index){  
							//animate out as blocks 
							var delay = index*30;
							$(this).css({opacity: 0.1}).show().delay(delay).animate({opacity: 1,"width":aWidth,"height":aHeight},200,'linear',function(){
								if(self.aniDiv.find("div").index(this) == 24){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 3:
						self.aniDiv.show().children("div:lt(5)").hide().each(function(index){
							var delay = $(this).attr('col')*100;
							$(this).css({opacity:0.1,"width":aWidth}).show().delay(delay).animate({opacity:1,"height":self.image.height()},700,'linear',function(){
								if(self.aniDiv.find(" div").index(this) == 4){
									self.finishAnimating(data);
								}
							});
						});
						break;							
					case 4:
						self.aniDiv.show().children().hide().each(function(index){
							if(index>4){ return; }
							var delay = $(this).attr('col')*10;
							aHeight = self.gapper($(this), aHeight);
							$(this).css({opacity:0.1,"height":"100%"}).show().animate({opacity:1,"width":aWidth},500,'linear',function(){
								if(self.aniDiv.find(" div").index(this) == 4){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 5:
						self.aniDiv.show().children().show().each(function(index){
							var delay = index*Math.floor(Math.random()*5)*7;
							aHeight = self.gapper($(this), aHeight);
							
							if($(".animation div").index(this) == 24){
								delay = 600;
							}
							$(this).css({"height":aHeight,"width":aWidth,"opacity":.01}).delay(delay).animate({"opacity":1},600,function(){
								if(self.aniDiv.find(" div").index(this) == 24){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 6:
						//full frame slide
						self.aniDiv.height(self.image.height()).hide().css({'background':'url('+data.source+') top left no-repeat'});
						self.aniDiv.children('div').hide();
						self.aniDiv.css({width:0}).show().animate({width:self.image.width()},'slow',function(){
							self.finishAnimating(data);
							self.aniDiv.css({'background':'transparent'});
						});
						break;
					case 7:
						//side in slide
						self.wrap.css({overflow:'hidden'});
						self.aniImg.height(self.image.height()).hide().attr('src',data.source);
						self.aniDiv.hide();
						self.image.css({position:'relative'}).animate({left:"-"+self.wrap.outerWidth()+"px"});
						self.aniImg.show();
						self.aniWrap.css({left:self.wrap.outerWidth()}).show().animate({left:"0px"},'slow',function(){
							self.finishAnimating(data);
						});
						break;
				}

	     },//end doAnimation
	     finishAnimating: function(data){
     		this.animating = false;
     		data.source = data.source.replace(this.options.thumbName, '');
			this.image.attr('src',data.source);
			this.image.css({left:"0"});
			this.image.show();
			var self = this;
			$('<img />').bind('load',function(){
				self.aniImg.hide();
				self.aniDiv.hide();
			}).attr('src',data.source);
     		var cur = this.list.find('img').index(this.active);
     		cur++;
     		var total = this.list.find('img').length;
     		this.counter.html(cur+"/"+total);
			if(data.clickThrough != ""){
				if(this.anchor == null){
					this.anchor	= this.image.wrap("<a>").parent();
				}
				this.anchor.attr('href',data.clickThrough);
				this.anchor.attr('title',data.clickThroughTitle);
			}else{
	        	if(this.image.parent('a').length > 0){ this.image.unwrap(); }
				this.anchor = null;
			}
     		if(this.options.showCaption && data.caption != "" && data.caption != null){
     			this.caption.html(data.caption)
     		}
     		if(this.options.autoPlay == true){
     			var self = this;
     			clearTimeout(this.timeOut);
     			this.timeOut = setTimeout((function(self){
					return function(){ self.nextClick(); };
				})(this), this.options.speed, this.timeOut);
     		}
     		
     		if(typeof(this.options.animationFinished) == 'function'){
	     		this.options.animationFinished(this);
	     	}
	     },//end finishedAnimating
		 gapper: function(ele, aHeight){
			if(ele.attr('row') == 9 && ele.attr('col') == 0){
				//last row, check the gap and fix it!
				var gap = ani_divs.height()-(aHeight*9);
				return gap;
			}
			return aHeight;
		 },
		 nextClick : function(e){
			var how = "natural";
		 	try{
				var self = e.data.self;
				if(typeof(e.data.self.options.next) == 'function'){
					e.data.self.options.next(this);
				}
			}catch(err){
				var self = this;
				how = "auto";
			}
			var next = self.active.parents('li:first').next().find('img');
			if(next.length == 0){next = self.list.find('img').eq(0);};
		 	next.trigger('click',{how:how});
		 },
		 prevClick : function(e){
			if(typeof(e.data.self.options.previous) == 'function'){
	     		e.data.self.options.previous(this);
	     	}
			var self = e.data.self;
			var prev = self.active.parents('li:first').prev().find('img');
			if(prev.length == 0){prev = self.list.find('img:last');};
		 	prev.trigger('click');
		 },
		 playClick: function(e){
		 	var self = e.data.self;
		 	self.options.autoPlay = !self.options.autoPlay;
			self.imgPlay.toggleClass('play').toggleClass('pause');
			if(self.options.autoPlay){ self.nextClick(); }
		 }
	}); //end extend

})(jQuery);