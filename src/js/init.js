define('init', [
	// 'jquery',
	'jquery.dataLink'
],
function() {
	'use strict';

	// $.fn.dataLink.default 값을 통해
	// 외부에서 플러그인 기본 옵션 값 수정

	$('a')

		// 플러그인 적용
		// 사용자 정의 옵션 전달
		.dataLink()

		// [체이닝 테스트] 클릭 이벤트 적용
		.on('click', function(e) {
			// 브라우저 기본동작 차단
			e.preventDefault();
			alert(e.target.getAttribute('href'));
		});

});