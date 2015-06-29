define([
	'jquery.utils',
], function() {
	'use strict';

	/**
	 * $().skipNav()의 역할 정의
	 * 스킵 내비게이션을 적용
	 * 문서 내 <body> 바로 밑에 적용
	 * 문서에서 한 번만 사용
	 * 내부의 링크 아이템은 3~4개 정도 선으로 봅니다.
	 * URL 뒤에 붙는 hash를 붙이지 않아야 합니다. - 웹 브라우저의 기본 동작을 차단
	 * 뒤로가기 버튼을 적용했을 때, 메모리
	 */

	// 플러그인 이름 설정
	var plugin = 'skipNav';

	// 플러그인 존재 유무 확인
	if( !$.fn[plugin] ) {

		// 플러그인 정의
		$.fn[plugin] = function(options) {

			// 플러그인 기본 + 사용자정의 옵션 병합
			var settings = $.extend({}, $.fn[plugin].defaults, options);

			// 플러그인이 적용된 $() 인스턴스 집합
			var $this = this;

			// 식별자 class, data- 접두사 속성 추가
			$this
				.addClass('skip-nav')
				// 이벤트 위임
				.on('click', 'a', function(e) {
					// 브라우저 기본 동작 차단
					e.preventDefault();
					var path = $.$(this).attr('href');
					console.log(path);
				})


			// 플러그인 적용 대상이 하나일 때, 체이닝 설정
			return $this;

		}

		// 플러그인 기본 옵션 설정
		$.fn[plugin].defaults = {

		};
	}

});