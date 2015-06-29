define(['jquery'], function($) {
	'use strict';

	// $(this);
	// $.$(this);
	$.$ = function(el) {
		// el 설정이 선택자(문자열)라면, el 변수에 Native 방식의 DOM 요소 참조
		if ($.type(el) === 'string') {
			el = document.querySelector(el);
		}

		return $.data(el, 'this') || $.data(el, 'this', $(el));
	};

	// $(this); $(this).index();
	// c = $.$config(this); c.el; c.index;
	$.$config = function(el, meta) {
		return {
			el : $.$(el),
			index : this.el.index(),
			meta : (meta ? meta[3] : null)
		};
	};

});