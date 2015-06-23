(function(global, $, Q){
	'use strict';

	Q.module('jquery.radioClass', {
		beforeEach: function(A) {
			this.elem = $('.test');
		}
	});

	Q.test('jQuery 사용 가능한가?', function(A) {
		// A.expect(1);
		A.ok($ === global.jQuery);
	});

	Q.test('jQuery.fn.radioClass 존재하는가?', function(A) {
		// A.expect(1);
		A.ok($.fn.radioClass);
	})

	Q.test('jQuery 체이닝이 가능한가?', function(A) {
		// A.expect(1);
		A.strictEqual(this.elem.radioClass(), this.elem);
	});

})(window, window.jQuery, window.QUnit);