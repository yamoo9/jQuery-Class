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