// 전역이 오염되지 않도록 별도의 공간을 생성
// 스코프 함수 (즉시 실행되는 함수 내부)
(function(global, $){
	'use strict';

	// $.fn.radioClass 플러그인이 존재하지 않는다면?
	if ( !$.fn.radioClass ) {

		// $.fn.radioClass 플러그인 정의
		$.fn.radioClass = function(name, context) {

			// context의 기본 값 설정
			// 사용자 정의 값이 있으면 덮어쓰기
			context = context || '';

			// 유효성검사
			if ( $.type(name) !== 'string' ) {
				throw new TypeError('전달된 name 인자는 문자열이어야 합니다.');
			}
			if ( $.type(context) !== 'string' ) {
				throw new TypeError('전달된 context 인자는 문자열이어야 합니다.');
			}

			// context가 설정되어 있으면 this 인스턴스 객체로부터 가장 가까운
			// DOM 객체를 찾아 jQuery 인스턴스 객체를 반환
			var _this = context
							? this.closest(context)
							: this;

			// jQuery 플러그인 내부의 this가 참조하는 것은?
			// this가 참조하는 것은 $() 인스턴스 객체
			_this.addClass(name);

			// _this 인스턴스 객체의 형제 인스턴스 집합을 찾아서
			// name 클래스 이름 값을 제거
			var $siblings = _this.siblings();

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