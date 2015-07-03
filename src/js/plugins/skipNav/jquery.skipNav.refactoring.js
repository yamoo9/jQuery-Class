define([
	'jquery.utils',
],
function() {
	'use strict';

	var plugin = 'skipNav';

	var _skipNav = {
		// 초기화 수행
		'init': function($el, options, callback) {
			this.$el = $el.eq(0);
			this.$links = this.$el.find('a');
			this.settings = $.extend(true, {}, $.fn[plugin].defaults, options);
			this.controls();
			this.events();

			return this;
		},
		'controls': function() {
			// 클래스 설정
			this.$el.addClass(this.settings.containerClass);
			this.$links
				.addClass(this.settings.linkClasses.hidden + ' ' + this.settings.linkClasses.focusable)
				.attr('aria-hidden', true);
		},
		'events': function() {
			this.$el
				.on('click', 'a', $.proxy(this.linksAction, this))
				.on('focusin focusout', 'a', this.toggleHidden);
		},
		'linksAction': function(e) {
			e.preventDefault();
			var path = e.target.getAttribute('href');
			var $target = $.$(path);
			if( this.settings.setContainerFocuing ) {
				$target
					.attr('tabindex', 0)
					.focus()
					.on('blur', $.proxy(this.setTabIndexMinus, $target));

			} else {
				$target.find('*:focusable').eq(0).focus();
			}

			this.settings.setHash && (window.location.hash = path);
		},
		'setTabIndexMinus': function() {
			// console.log(this); // _skipNav 객체
			this.attr('tabindex', -1);
		},
		'toggleHidden': function(e) {
			var $link = $.$(this);
			if (e.type === 'focusin') {
				$link.attr('aria-hidden', false);
			} else {
				$link.attr('aria-hidden', true);
			}
		}
	};

	if( !$.fn[plugin] ) {

		$.fn[plugin] = function(options, callback) {

			// SkipNav 객체 초기화 수행
			var __skipNav = _skipNav.init(this, options, callback);

			this.data('_skipNav', __skipNav);

			return this;

		};

		$.fn[plugin].defaults = {
			'containerClass': 'skipNav-container',
			'linkClasses': {
				'hidden': 'a11y-hidden',
				'focusable': 'focusable'
			},
			'setHash': true,
			'setContainerFocuing': true
		};
	}

});