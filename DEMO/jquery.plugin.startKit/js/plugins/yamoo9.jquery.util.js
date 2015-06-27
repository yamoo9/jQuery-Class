define([
	'jquery'
],
function($) {
	'use strict';

	/**
	 * jQuery 표준
	 * $.fn.jquery, $().jquery
	 * ----------------------------
	 * 사용자 정의
	 * $.version
	 */
	if (!$.version) {
		$.version = $().jquery;
	}

	/**
	 * jQuery 표준
	 * $.expr[':']
	 * ----------------------------
	 * 사용자 정의
	 * $.ex
	 */
	if (!$.ex) {
		$.ex = $.expr[':'];
	}

	/**
	 * Console 표준
	 * console.log()
	 * ----------------------------
	 * 사용자 정의
	 * $.log()
	 */
	if (!$.log) {
		$.log = function(arg) {
			if (window.console) {
				console.log(arg);
			}
		};
	}

	/**
	 * jQuery 표준
	 * $(this) x α
	 * ----------------------------
	 * 사용자 정의
	 * $.$(this)
	 */
	if ( !$.$ ) {
		$.$ = function(el) {
			// if ( !$.data(el, '@this') ) {
			// 	$.data(el, '@this', $(el));
			// }

			// return $.data(el, '@this');

			return $.data(el, '@this') || $.data(el, '@this', $(el));
		}
	}

	/**
	 * jQuery 표준
	 * $(el), $(el).index(), meta[3]
	 * ----------------------------
	 * 사용자 정의
	 * config.el, config.index, config.meta
	 */
	$.$config = function(el, meta) {
		var $el     = $.$(el),
			_config = {
			el    : $el,
			index : $el.index(),
			meta  : (meta ? meta[3] : null)
		};
		return _config;
	};

});