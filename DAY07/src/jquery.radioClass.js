// 전역이 오염되지 않도록 별도의 공간을 생성
// 스코프 함수 (즉시 실행되는 함수 내부)
(function(global, $){
	'use strict';

	// $.fn.radioClass 플러그인이 존재하지 않는다면?
	if ( !$.fn.radioClass ) {

		// $.fn.radioClass 플러그인 정의
		$.fn.radioClass = function(name) {

			// jQuery 플러그인 내부의 this가 참조하는 것은?
			// this가 참조하는 것은 $() 인스턴스 객체
			this.addClass(name);

			// this 인스턴스 객체의 형제 인스턴스 집합을 찾아서
			// name 클래스 이름 값을 제거
			var $siblings = this.siblings();

			$.each($siblings, function(index, el) {
				var _$sibling = $siblings.eq(index);
				if ( _$sibling.hasClass(name) ) {
					_$sibling.removeClass(name);
				}
			});



			// 체이닝을 위한 this 반환 설정
			return this;
		};

	}

})(window, window.jQuery);