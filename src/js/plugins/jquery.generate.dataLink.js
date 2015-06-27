/*! jquery.generate-dataLink-0.1.0.js © yamoo9.net, 2015 */
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
		// var _default = '[href][class*="slide-btn-"]';


		// 플러그인 정의
		$.fn.dataLink = function(filterExp) {

			// $() 인스턴스 객체 self 변수에 filtering 하여 참조
			var self = this.filter( filterExp || $.fn.dataLink.default );

			// $() 인스턴스 집합에 개별적 플러그인 적용을 위한 $.each() 코드
			return $.each(self, function(index, item) {

					// 집합 내 개별 $() 인스턴스 객체 참조
				var $item      = self.eq(index),

					// href 속성 참조
					link_path  = $item.attr('href'),

					// 외부 링크 속성 여부 확인
					// RegExp를 활용한 방법: link_path.match(/^http:\/\//)
					isExternal = link_path.indexOf('http://') > -1,

					// isExternal 값이 참이면 && 뒤 코드 실행 (거짓이면 실행 X)
					linkFix    = isExternal && link_path.replace('http://', '');


				// isExternal 값이 참이면 && 뒤 코드 실행 (거짓이면 실행 X)
				// if ( isExternal ) {
				// 	$item.attr('rel', 'external');
				// }
				isExternal && $item.attr('rel', 'external');

				// $item 인스턴스 객체에 .attr() 설정
				$item.attr({
					'role'          : 'button', // WAI-ARIA 1.0 역할 "버튼" 정의
					'data-linktext' : linkFix,  // data-linktext 설정
				});

			});

		};

		/**
		 * 플러그인 기본 옵션
		 * 외부에서 접근가능하게 설정
		 */
		$.fn.dataLink.default = '[href][class*="slide-btn-"]';

	}
});