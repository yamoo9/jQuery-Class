[＜ README.md](../README.md)

---

### jQuery 플러그인 옵션 설정
```js
/* js/plugins/jquery.dataLink.js
 * ---------------------------------------------------------------------------
 */
// 2개 이상 옵션(객체)을 합칩니다. [병합]
// 객체 + 객체 [비교][속성이 다른것이 있으면 합치고][같은 속성이면 나중에 전달된 객체의 속성이 우선]
var settings = $.extend({}, $.fn.dataLink.defaults, options);
```

#### jquery.dataLink.js 플러그인 코드
```js
/*! jquery.generate-dataLink-0.1.1.js © yamoo9.net, 2015 */
define([
	// 의존 모듈
],
function() {
	'use strict';

	// 플러그인 존재 유무 확인
	if ( !$.fn.dataLink ) {

		// 플러그인 정의
		$.fn.dataLink = function(options, callback) {

			var settings = $.extend({}, $.fn.dataLink.defaults, options);
				$this    = this.filter( settings.filterExp );

			// $() 인스턴스 집합에 개별적 플러그인 적용을 위한 $.each() 코드
			return $.each($this, function(index, item) {

					// 집합 내 개별 $() 인스턴스 객체 참조
				var $item      = $this.eq(index),

					// href 속성 참조
					// link_path  = $item.attr('href'),
					link_path  = item.getAttribute('href'),

					// 외부 링크 속성 여부 확인
					// RegExp를 활용한 방법: link_path.match(/^http:\/\//)
					isExternal = link_path.indexOf('http://') > -1,

					// isExternal 값이 참이면 && 뒤 코드 실행 (거짓이면 실행 X)
					linkFix    = isExternal && link_path.replace('http://', '');

				// 플러그인이 적용되는 개별 $()인스턴스 객체가 참조하는 DOM 객체에 class 속성 설정
				$item.addClass(settings.cNamePrefix + settings.cName);

				// isExternal 값이 참이면 && 뒤 코드 실행 (거짓이면 실행 X)
				// if ( isExternal ) {
				// 	$item.attr('rel', 'external');
				// }
				isExternal && $item.attr('rel', 'external');
				linkFix && $item.attr('data-linktext', linkFix);
				settings.button && $item.attr('role', 'button');

				// 플러그인 코드 종료 후에 실행되는 콜백함수
				if ( callback && $.isFunction(callback) ) {
					callback.call($item, settings);
				}

			});

		};

		/**
		 * 플러그인 기본 옵션
		 * 외부에서 접근가능하게 설정
		 */
		$.fn.dataLink.defaults = {
			filterExp   : '[href]',
			cNamePrefix : 'slide-',
			cName       : 'shape-top',
			button      : false
		};


	}
});
```

#### jquery.skipNav.js 플러그인 코드

```js
define([
	'jquery.utils',
], function() {
	'use strict';

	/**
	 * 스킵 내비게이션을 적용
	 * $().skipNav() 플러그인 역할 정의
	 * ------------------------------------------------------------
	 * <body> 바로 밑에 적용.
	 * 문서에서 한 번만 사용됨.
	 * 내부의 링크 아이템은 3~4개 정도 선으로 설정.
	 * 웹 브라우저의 기본 동작을 차단.
	 * 비 포커스 요소에 포커스 설정을 위한 tabindex=0 설정.
	 * 블러 이벤트 발생 후, tabindex=-1 설정.
	 * 뒤로가기 버튼을 적용했을 때, 메모리(URL 뒤에 붙는 hash) 설정
	 */

	// 플러그인 이름 설정
	var plugin = 'skipNav';

	// 플러그인 존재 유무 확인
	if( !$.fn[plugin] ) {

		// 플러그인 정의
		$.fn[plugin] = function(options, callback) {

			// 플러그인 기본 + 사용자정의 옵션 병합
			var settings = $.extend({}, $.fn[plugin].defaults, options);

			// 플러그인이 적용된 $() 인스턴스 집합
			var $this = this;

			$this
				// 식별자 class 속성 추가
				.addClass( settings.container )

				// 이벤트 위임
				// $this 내부 a 요소에게만 callback 함수 적용
				.on('click', 'a', function(e) {

					// 브라우저 기본 동작 차단
					e.preventDefault();

					// 스킵 내비게이션 링크 아이템의 href 속성 참조
					// var path = $.$(this).attr('href');
					var path = e.target.getAttribute('href');

					// 목적지 ID === path
					// $.$() 개량 - DOM 요소 뿐만 아니라, 선택자도 적용 가능하도록 조치
					// utils/jquery.utils.js 확인
					var $target = $.$(path);

					$target

						// 목적지 요소에 접근성을 부여하기 위해
						// 비 포커스 요소에 tabindex=0 속성을 정의합니다.
						.attr('tabindex', 0)

						// 포커스를 적용합니다.
						.focus()

						// 블러 이벤트가 발생하면 tabindex 속성을 -1로 변경합니다.
						.on('blur', function() {
							$target.attr('tabindex', -1);
						});

					// 뒤로가기 버튼을 적용했을 때, 메모리(URL 뒤에 붙는 hash) 설정
					window.location.hash = path;

					// callback 함수 전달 시, 플러그인 완료 후 callback 함수 실행
					if ( callback && $.isFunction(callback) ) {
						// callback() 함수 내부 this가 $target을 참조하도록 설정
						// callback() 함수 내부에 전달되는 첫번째 인자 값을 settings로 설정
						callback.call($target, settings);
					}

				});


			// 플러그인 적용 대상이 하나일 때, 체이닝 설정
			return $this;

		}

		// 플러그인 기본 옵션 설정
		$.fn[plugin].defaults = {
			'container': 'skipNav-container'
		};
	}

});
```

### jquery.utils.js 확장 코드
```js
define(['jquery'], function($) {
	'use strict';

	/**
	 * --------------------------------
	 * jQuery.fx.speeds 확장
	 * --------------------------------
	 */
	$.extend($.fx.speeds, {
		'very-fast' : 100,
		// 'fast'      : 200,
		// 'normal'    : 400,
		// 'slow'      : 600,
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
				}
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
			if (el.jquery) {el = el[0]; }
			if (typeof el === 'string') {el = $.selector(el); }
			if (!el || !el.nodeName) { throw new TypeError('타입오류: DOM객체 또는 $() 필요'); }
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

	 * The New Sizzle
	 * http://blog.jquery.com/2012/07/04/the-new-sizzle/
	 * https://github.com/jquery/sizzle/wiki#sizzleselectorspseudosname--function-elem--
	 * https://github.com/jquery/sizzle/wiki#sizzleselectorscreatepseudofunction
	 * --------------------------------
	 */

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
		}

	});

	/**
	 * jQuery.expr[':'] 확장 - display
	 * --------------------------------
	 */
	var filter = 'inline, inline-block, block, list-item'.split(', '),
		k      = 0,
		l      = filter.length;

	for(; k<l; k++) {
		(function(display_value){
			$.ex[display_value] = function(el) {
				return $.$(el).css('display') === display_value;
			}
		})(filter[k]);
	}

});
```