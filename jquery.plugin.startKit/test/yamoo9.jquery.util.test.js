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
		var done = A.async(), ms=100;
		setTimeout(function() {
			A.ok(!!A.async, ms + '밀리초 뒤에 비동기 실행되었음');
			done();
		}, ms);
	});

	/**
	 * --------------------------------
	 * jQuery 플러그인 테스트 모듈 등록
	 * --------------------------------
	 */
	Q.module('yamoo9.jquery.util 플러그인 테스트', {
		beforeEach: function() {
			// 각각의 테스트를 수행하기 전에 실행되는 코드
		},
		afterEach: function() {
			// 각각의 테스트가 완료된 뒤에 실행
		}
	});

	Q.test('$.version 및 $.log()가 존재하는가?', 2, function(A){
		A.ok($.version, '$.version 존재');
		A.ok($.log, '$.log 존재');
	});

})(window, window.QUnit);