define([
	'jquery'
],
function($) {
	'use strict';

	/**
	 * --------------------------------
	 * jQuery.fx.speeds 확장
	 * --------------------------------
	 */
	$.extend($.fx.speeds, {
		'very-fast' : 100,
		'fast'      : 200,
		'normal'    : 400,
		'slow'      : 600,
		'very-slow' : 800,
		'1s'        : 1000
	});

	/**
	 * --------------------------------
	 * jQuery 유틸리티 메소드 확장
	 * --------------------------------
	 */
	$.extend($, {

		'version': $.fn.jquery,

		'ex': $.expr[':'],

		'selector': (function(){
			if (document.querySelector) {
				return function(selector) {
					return document.querySelector(selector);
				};
			}
		})(),

		'selectorAll': (function(){
			if (document.querySelectorAll) {
				return function(selector) {
					return document.querySelectorAll(selector);
				}
			}
		})(),

		'$': function(el) {
			// 유효성검사 (Validation)
			if (el.jquery) {el = el[0]; }
			if (typeof el === 'string') {el = $.selector(el); }
			if (!el || !el.nodeName) { throw new TypeError('타입오류: DOM객체 또는 $() 필요'); }
			// 처리 코드
			return $.data(el, 'this') || $.data(el, 'this', $(el));
		},

		'config': function(el, meta) {
			return {
				el    : $.$(el),
				index : $.$(el).index(), // this.el.index()
				meta  : $.expr.createPseudo ? meta : meta[3]
			};
		},

		'$css': function(el, cssCode) {
			if (el.jquery) {el = el[0]; }
			if (!el.nodeName || typeof cssCode !== 'string') {
				throw new TypeError('타입오류: 첫번째 인자 DOM객체 또는 $() 필요, 두번째 전달인자 문자 데이터 필요');
			}
			el.style.cssText += cssCode;
			return $.$(el);
		},

		'activeElement': function() {
			return document.activeElement;
		},

		'log': (function(){
			if( console && console.log ) {
				return function() {
					console.log.apply(console, $.makeArray(arguments));
				};
			}
		}()),

		'group': (function(){
			if( console && console.group ) {
				return function(name) {
					console.group(name);
				};
			}
		})(),

		'groupEnd': (function(){
			if( console && console.groupEnd ) {
				return function() {
					console.groupEnd();
				};
			}
		})(),

		'time': (function(){
			if( console && console.time ) {
				return function(name) {
					console.time(name);
				};
			}
		})(),

		'timeEnd': (function(){
			if( console && console.timeEnd ) {
				return function(name) {
					console.timeEnd(name);
				};
			}
		})(),

	});

	/**
	 * --------------------------------
	 * jQuery.expr[':'] 확장
	 * jQuery.expr[':'] === jQuery.expr.pseudos

	 * The New Sizzle
	 * http://blog.jquery.com/2012/07/04/the-new-sizzle/
	 * https://github.com/jquery/sizzle/wiki#sizzleselectorspseudosname--function-elem--
	 * https://github.com/jquery/sizzle/wiki#sizzleselectorscreatepseudofunction
	 * --------------------------------
	 */

	// jQuery.expr === Sizzle.selectors
	// jQuery.expr[':'] === Sizzle.selectors.pseudos

	$.extend($.ex, {

		'icon': $.expr.createPseudo ?
			$.expr.createPseudo(function(meta) {
				return function(el) {
					var cn = el.className.toLowerCase();
					return meta ? (cn.match('icon-') && cn.match(meta) ) : cn.match('icon-');
				}
			}) :
			function(el, index, meta) {
				// return el.className.toLowerCase().match('icon-');
				var _meta = meta[3],
					cn = el.className.toLowerCase();
				return _meta ? ( cn.match('icon-') && cn.match(_meta) ) : cn.match('icon-');
			},

		'debug': $.expr.createPseudo ?
		$.expr.createPseudo(function(meta) {
			return function(el) {
				$.log(
					'--- DEBUG ---',
					'\nel: ', el,
					'\nmeta: ', meta,
					'\n--- // DEBUG ---'
				);
			};
		}) :
		function(el, index, meta) {
			$.log(
				'--- DEBUG ---',
				'\nel: ', el,
				'\nindex: ', index,
				'\nmeta: ', meta[3],
				'\n--- // DEBUG ---'
			);
		},

		'nth-group': $.expr.createPseudo ?
		$.expr.createPseudo(function(meta) {
			return function(el) {
				var config = $.config(el);
				if(!meta || !$.isNumeric(meta)) { throw new TypeError(':nth(3)처럼 () 안에 숫자 값을 넣어주세요.'); }
				return (config.index + 1) % meta === 0;
			}
		}) :
		function(el, index, meta) {
			var config = $.config(el, meta);
			if(!config.meta) { throw new TypeError(':nth(3)처럼 () 안에 숫자 값을 넣어주세요.'); }
			return (config.index + 1) % config.meta === 0;
		},

		'btn': $.expr.createPseudo ?
		$.expr.createPseudo(function(meta) {
			return function(el) {
				return $.$(el).hasClass('btn') && config.el.data('btn', meta);
			}
		}) :
		function(el, index, meta) {
			var config = $.config(el, meta);
			return config.el.hasClass('btn') && config.el.data('btn', config.meta);
		},

		'focusable' : function(el) {
			el.focus();
			return el === $.activeElement();
		}

	});

	/**
	 * jQuery.expr[':'] 확장 - display
	 * http://www.w3schools.com/cssref/pr_class_display.asp
	 * --------------------------------
	 */
	var filter = 'inline, inline-block, block, list-item, table, inline-table, table-caption, table-row, table-cell, table-column, flex, inline-flex'.split(', '),
		k      = 0,
		l      = filter.length;

	for(; k<l; k++) {
		(function(display_value){
			$.ex[display_value] = function(el) {
				return $.$(el).css('display') === display_value;
			}
		})(filter[k]);
	}


	/**
	 * --------------------------------
	 * jQuery 유틸리티 메소드 오버라이딩
	 * --------------------------------
	 */
	$.extend($, {
		/**
		 * $.merge 오버라이딩
		 * --------------------------------
		 */
		'merge' : (function(){
			// $.merge 유틸리티 메소드 백업
			var originMerge = $.merge;
			// $.merge 재정의
			return function() {
				var args = arguments,
					l    = args.length,
					i    = 1;
				for (; i<l; i++) {
					if (args[i]) {
						originMerge(args[0], args[i]);
					}
				}
				return args[0];
			};
		}()),

	});


	/**
	 * --------------------------------
	 * jQuery 인스턴스 메소드 오버라이딩
	 * --------------------------------
	 */
	$.fn.extend({
		/**
		 * $.fn.css 오버라이딩
		 * --------------------------------
		 */
		'css': (function(){
			// $.fn.css 인스턴스 메소드 $.fn._css에 백업
			var originCss = $.fn.css;
			// $.fn.css 재정의
			return function() {
				var arg = arguments[0];
				if ( typeof arg === 'string' && arg.match(/:/) && !arguments[1] ) {
					$.each(this, function(index, el) {
						el.style.cssText = arg;
					});
				} else {
					return originCss.apply(this, arguments);
				}
			};
		})(),

		/**
		 * $.fn.attr 오버라이딩
		 * --------------------------------
		 */
		'attr': (function(){
			// $.fn.attr 인스턴스 메소드 $.fn._attr에 백업
			var originAttr = $.fn.attr;
			// $.fn.attr 재정의
			return function() {
				var arg = arguments[0];
				if ( $.type(arg) === 'object' ) {
					$.each(this, function(index, el) {
						$.each(arg, function(prop, value) {
							el.setAttribute(prop, value);
						});
					});
				} else {
					return originAttr.apply(this, arguments);
				}
			};
		})(),

	});

});