(function(Q, $){
	'use strict';

	// Qunit 모듈 정의
	Q.module('jquery.radioClass', {
		beforeEach: function() {
			this.$test = $('.test');
			this.$test.radioClass();
		}
	});

	Q.test('jQuery를 사용할 준비가 되었는가?', function(A) {
		A.ok($ === window.jQuery, 'jQuery 사용 준비 완료!');
	});

	Q.test('사용하는 jQuery 버전은 1 버전대인가?', function(A) {
		A.ok($.fn.jquery[0] === '1', 'jQuery 1.x 버전대 사용!');
		// A.strictEqual($.fn.jquery[0], '1', 'jQuery 1.x 버전대 사용!');
	});

	Q.test('$.fn은 jQuery.prototype인가?', function(A){
		A.strictEqual($.fn, jQuery.prototype);
	});

	Q.test('$.fn.radioClass가 존재하는가?', function(A){
		A.ok($.fn.radioClass);
	});

	Q.test('$(".test")에 class 속성 "its-me"가 추가되었는가?', function(A) {
		A.ok(this.$test.hasClass('its-me'));
	})

})(window.QUnit, window.jQuery);