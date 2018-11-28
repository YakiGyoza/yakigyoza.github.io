var gyoza = (function() {

	// 変数宣言
	var point_sp = 767;

	// このJSのinit
	function init() {
		smoothScroll();
		menuTrigger();
		headerFixed();
	}

	// 関数 ------------------------------------
	function smoothScroll() {
		$('a[href^="#"]').on('click.smoothScroll', function() {
			var speed = 1200;// ミリ秒
			var href = $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$('html, body').animate({ scrollTop: position }, speed, 'swing');
			return false;
		});
	}

	function menuTrigger() {
		var $trigger = $('.menu-trigger'),
		    $nav = $('.nav-global'),
		    $anchor = $nav.find('a[href^="#"]');

		$trigger.on('click', function() {
			$(this).toggleClass('is-active');
			$nav.slideToggle();
			return false;
		});

		$(window).on('load resize', function() {
			var winWidth = $(window).width();
			if(winWidth > point_sp && $nav.is(':hidden')) {
				$nav.removeAttr('style');
			}
		});

		var flag = '';
		$(window).on('load resize', function() {
			var w = $(window).width();
			if (w > point_sp && flag != 'pc'){
				flag = 'pc';

				$anchor.off('click.anchorScroll');

			} else if (w <= point_sp && flag != 'sp'){
				flag = 'sp';

				$anchor.on('click.anchorScroll', function() {
					$trigger.removeClass('is-active');
					$nav.slideUp();
				});
			}
		});

	}

	function headerFixed() {
		$(window).on('load scroll', function(){
			var $header = $('.header'),
			    taglineHeight = $('.tagline').outerHeight();
			if ($(window).scrollTop() > taglineHeight){
				$header.addClass('is-fixed');
			} else {
				$header.removeClass('is-fixed');
			}
		});
	}
	// -----------------------------------------

	return {
		init : init
	};

})();

// このタイミングで実行
$(function() {
	gyoza.init();
});
