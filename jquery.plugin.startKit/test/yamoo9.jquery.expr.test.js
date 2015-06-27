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
	Q.module('yamoo9.jquery.expr 플러그인 테스트', {
		beforeEach: function() {
			// 각각의 테스트를 수행하기 전에 실행되는 코드
			var in_html__code = '', i=1, l=8;
			for (; i<l; i++) {
				in_html__code += '<div>div-'+ i +' Element Node</div>';
			}

			var $f = $('#qunit-fixture');

			this.$demo = $('<div>', {
				'id': 'demo',
				'html': in_html__code
			})

			$f.append(this.$demo);

		},
		afterEach: function() {
			// 각각의 테스트가 완료된 뒤에 실행
		}
	});

	Q.test('$("div:inline") 사용할 수 있는가?', function(A){
		A.ok($.expr[':'].inline);
	});

	Q.test('inline, block 요소별 인스턴스 집합은 색상 설정이 적용되었나?', 2, function(A){
		var inlineDiv = this.$demo.children(':inline').css('color', '#34C0FF');
		var blockDiv = this.$demo.children(':block').css('color', '#25A04D');
		A.ok(inlineDiv.css('color'));
		A.ok(blockDiv.css('color'));
	});

})(window, window.QUnit);