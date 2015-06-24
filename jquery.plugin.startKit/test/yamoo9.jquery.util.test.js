(function(global, Q){

	Q.module('jQuery 준비 단계');

	Q.test('웹 브라우저 환경이고, jQuery를 사용할 준비가 되었는가?', 2, function(A){
		// A.expect(3);
		A.strictEqual(window, global);
		A.ok(window.jQuery); // Okay
	});

	Q.test('$는 jQuery인가?', function(A){
		A.strictEqual(window.jQuery, $);
	});

	Q.test('$.fn은 jQuery.prototype인가?', function(A){
		A.strictEqual($.fn, $.prototype);
	});

	// Qunit.test() 비동기 실행
	Q.test('Qunit을 비동기 실행하였는가?', function(A){
		var done = A.async(), ms=1000;
		setTimeout(function() {
			A.ok(!!A.async, ms + '밀리초 뒤에 비동기 실행되었음');
			done();
		}, ms);
	});

})(window, window.QUnit);