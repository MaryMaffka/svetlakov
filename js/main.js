  $(document).ready(function(){
			$('a[href^="#"]').bind('click.smoothscroll',function (e) {
				e.preventDefault();

				var target = this.hash,
				$target = $(target);
		
				$('.layer-sub-navigation').animate({
					'top':'0'
					}, 1500 );
				$('.layer-sub-navigation').addClass('layer-wrapper_fixed-top');
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
					}, 900, 'swing', function () {
					window.location.hash = target;
					});
			});		
	});
	

	
	function NavigationOnPage(options){
    this.defaultOptions = {
        scrollOffset: 0,
        /* scrollTo scroll the page not to correct point. add some pixels for fix this. */
        fix: 10
    };

    this.jNav = $('.navigation_on-page');
    this.jPrevSelectedItem = null;
    this.jNavSections = $('.nav-section');
    this.options = $.extend(true, {}, this.defaultOptions, options);

    if(this.jNav.length > 0){
        this.initEvents();
    }
}

NavigationOnPage.prototype.initEvents = function(){
    var that = this;

    $.each($('.sub-navigation .navigation__item > a'), function( key, value ) {
        if($(value).attr('href') == window.location.hash) {
            $.scrollTo($(value).attr('href'), 500, {
                offset: (-1 * that.options.scrollOffset)
            });
        }
    });
    
    that.jNav.on('click', '.navigation__item > a', function(e){
        e.preventDefault();
        var jItem = $(this).parent();
        if( !jItem.hasClass('navigation__item_selected') ){
            $.scrollTo($(this).attr('href'), 500, {
                offset: (-1 * that.options.scrollOffset)
            });
        }
    });

    that.jNavSections
    .waypoint(function(direction){
        that.jNav
        .find('a[href="#' + this.id + '"]')
        .parent()
        .toggleClass('navigation__item_selected link-selected', direction === 'down');
    },{
        offset: that.options.scrollOffset + that.options.fix
    })
    .waypoint(function(direction) {
        that.jNav
        .find('a[href="#' + this.id + '"]')
        .parent()
        .toggleClass('navigation__item_selected link-selected', direction === 'up');
    },{
        offset: function() {
            return -$(this).height() + that.options.scrollOffset + that.options.fix;
        }
    });
};

function SubNavigation(){
    this.jLHeader = $('.layer_header');
    this.jLSubNav = $('.layer-sub-navigation');
    this.jSubMenu = $('.sub-navigation');


    this.scrollDrection = '';
    this.direction = '';

    this.classes = {
        fixedHeader: 'layer_header-fixed',
        fixedLayerSubNav: 'layer-wrapper_fixed-top'
    };

    this.subMenuParams = {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        outerHeight: 0,
        offsetTop: 0
    };

    if(this.jLSubNav.length > 0){
        this.subMenuParams = this.getStartParams();
        this.initEvents();
    }
}

SubNavigation.prototype.getStartParams = function(){
    var that = this,
    h,
    outerHeight,
    paddingTop,
    paddingBottom;

    /* set navigation fixed for getting paddings and heaght */
    that.jLSubNav.addClass(that.classes.fixedLayerSubNav);

    h = that.jSubMenu.height();
    outerHeight = that.jLSubNav.outerHeight();
    paddingTop = parseInt(that.jSubMenu.css('padding-top').replace("px", ""));
    paddingBottom = parseInt(that.jSubMenu.css('padding-bottom').replace("px", ""));

    that.jLSubNav.removeClass(that.classes.fixedLayerSubNav);

    return {
        height: h,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        outerHeight: outerHeight,
        offsetTop: that.jSubMenu.offset().top - paddingTop
    };
};

SubNavigation.prototype.initEvents = function(){
    var that = this,
    sct = 0;

    $(window).on('scroll', function(){
        sct = $(this).scrollTop();
		$('.fpseudo').show();
		if(sct >= 100){
			that.direction = that.direction;
            that.scrollDrection = 'down';
			if(!$('.layer-sub-navigation').hasClass("layer-wrapper_fixed-top")){
			that.jLSubNav.stop().animate({
				'top':'0'
				}, 1500 );
			that.jLSubNav.addClass(that.classes.fixedLayerSubNav);
			}
			
        }else{
            that.direction = that.scrollDrection;
            that.scrollDrection = 'up';
			that.jLSubNav.stop().animate({
				'top':'-162px'
			}, 1500 );
			that.jLSubNav.removeClass(that.classes.fixedLayerSubNav);
		
        }
        if(that.scrollDrection != that.direction){           
            that.direction = that.scrollDrection;
            that.updateHeader();
            $('.fpseudo').hide();
        }
    });
};

SubNavigation.prototype.updateHeader = function(){
    var that = this;

    if(that.direction == 'down'){
	
    }else{

    }

};

$(function(){
    var subNav = new SubNavigation();
    var navOnPage = new NavigationOnPage({
        scrollOffset: subNav.subMenuParams.outerHeight
    });

});
