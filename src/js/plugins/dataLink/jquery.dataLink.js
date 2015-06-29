/*! jquery.generate-dataLink-0.1.1.js © yamoo9.net, 2015 */
define([
	// 의존 모듈
],
function() {
	'use strict';

	// console.log('사용 중인 jQuery 버전은?\n', $().jquery);

	/**
	 * --------------------------------
	 * jQuery 플러그인 디자인 패턴
	 * 이름 정의
	 * 플러그인 유무 확인
	 * 플러그인 작성
	 * 플러그인 내부 this 참조 확인
	 * 플러그인 체이닝 설정
	 * --------------------------------
	 */

	// 플러그인 존재 유무 확인
	if ( !$.fn.dataLink ) {

		/**
		 * 플러그인 기본 옵션
		 * 외부에서 접근 불가능 (영역 내 지역변수)
		 */
		// var _default = '[href]';

		// 기본 옵션     : defaluts
		// 사용자 정의 옵션 : options
		// 병합된 옵션    : settings

		// 플러그인 정의
		$.fn.dataLink = function(options, callback) {

			// 기본 옵션과	사용자 설정한 옵션을 콘솔을 통해 확인
			// console.log('$.fn.dataLink.defaults\n', $.fn.dataLink.defaults);
			// console.log('options\n', options);

			// 2개 이상 옵션(객체)을 합칩니다. [병합]
			// 객체 + 객체 [비교][속성이 다른것이 있으면 합치고][같은 속성이면 나중에 전달된 객체의 속성이 우선]
			var settings = $.extend({}, $.fn.dataLink.defaults, options);

			// console.log('settings\n', settings);

			// $() 인스턴스 객체 self 변수에 filtering 하여 참조
			var self = this.filter( settings.filterExp );

			// $() 인스턴스 집합에 개별적 플러그인 적용을 위한 $.each() 코드
			return $.each(self, function(index, item) {

					// 집합 내 개별 $() 인스턴스 객체 참조
				var $item      = self.eq(index),

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
					callback();
				}

			});

		};

		/**
		 * 플러그인 기본 옵션
		 * 외부에서 접근가능하게 설정
		 */
		// $.fn.dataLink.filterExp = '[href]';
		// $.fn.dataLink.className = 'slide-shape-top';

		$.fn.dataLink.defaults = {
			filterExp   : '[href]',
			cNamePrefix : 'slide-',
			cName       : 'shape-top',
			button      : false
		};


	}
});