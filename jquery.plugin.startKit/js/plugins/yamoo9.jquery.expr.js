define([
	'jquery',
	'yamoo9.jquery.util'
],
function($) {
	'use strict';

	/**
	 * 참고 URL
	 * https://coderwall.com/p/gdt7ga/custom-jquery-selectors-using-expressions
	 * http://malsup.com/jquery/expr/
	 */

	/**
	 * jQuery 표준
	 * $('span[class*="icon-"]');
	 * ----------------------------
	 * 사용자 정의
	 * $('span:icon');
	 */
	$.expr[':'].icon = function(el, index, meta) {
		return el.className.toLowerCase().match('icon-');
	};

	/**
	 * jQuery 표준
	 * $('span[class*="icon-"][class*="-mega"]');
	 * ----------------------------
	 * 사용자 정의
	 * $("span:icon(mega)");
	 */
	$.expr[':'].icon = function(el, index, meta) {
		var _meta = meta[3],
			cn = el.className.toLowerCase();
		return _meta ? ( cn.match('icon-') && cn.match(_meta) ) : cn.match('icon-');
	};

	/**
	 * 사용자 정의 디버깅
	 * $('span:first:debug');
	 */
	$.expr[':'].debug = function(el, index, meta) {
		console.log('--- DEBUG ---', '\nel: ', el, '\nindex: ', index, '\nmeta: ', meta[3], '\n--- // DEBUG ---');
		// console.log('--- DEBUG ---');
		// console.log('el: ', el);
		// console.log('index: ', index);
		// console.log('meta: ', meta[3]);
		// console.log('--- // DEBUG ---');
	};

	/**
	 * jQuery 표준
	 * $('span:nth-child(3n)');
	 * ----------------------------
	 * 사용자 정의
	 * $('span:nth(3)');
	 */
	$.expr[':'].nth = function(el, index, meta) {
		var config = $.$config(el, meta);
		if(!config.meta) { throw new TypeError(':nth(3)처럼 () 안에 숫자 값을 넣어주세요.'); }
		return (config.index + 1) % config.meta === 0;
	};

	/**
	 * jQuery 표준
	 * $('span').each(function(index, el) { return $(this).css('display') === 'block' });
	 * -----------------------------------------------------------------------------------
	 * 사용자 정의
	 * $('span:block');
	 */
	var filter = 'inline, inline-block, block, list-item'.split(', '),
		k      = 0,
		l      = filter.length;

	for(; k<l; k++) {
		(function(display_value){
			$.expr[':'][display_value] = function(el, index, meta) {
				var config = $.$config(el, meta);
				return config.el.css('display') === display_value;
			}
		})(filter[k]);
	}

	/**
	 * jQuery 표준
	 * $("a.btn.new-repo").data("button", "new-repo");
	 * ----------------------------
	 * 사용자 정의
	 * $("a:button(new-repo)");
	 */
	$.expr[':'].btn = function(el, index, meta) {
		var config = $.$config(el, meta);
		console.log(config);
		return config.el.hasClass('btn') && config.el.data('btn', config.meta);
	};

});