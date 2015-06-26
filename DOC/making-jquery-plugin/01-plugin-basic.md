## jQuery 플러그인 제작 프로세스

**0.** 영역 내, $ 별칭 보호
```js
(function(global, $){
	'use strict';
	// $ === window.jQuery
})(window, window.jQuery);
```

**1.** 플러그인 기본형 쉘 작성
```js
(function(global, $){
	'use strict';

	var plugin_name = '{{플러그인 이름}}';

	if ( !$.fn[plugin_name] ) {
		$.fn[plugin_name] = function() {
			// 플러그인 코드
		};
	}

})(window, window.jQuery);
```

**2.** 체이닝 설정
```js
(function(global, $){
	'use strict';

	var plugin_name = '{{플러그인 이름}}';

	if ( !$.fn[plugin_name] ) {
		$.fn[plugin_name] = function() {

			// jQuery 체이닝 설정
			return this;
		};
	}

})(window, window.jQuery);
```

**3.** $.each() 유틸리티 메소드 활용
```js
(function(global, $){
	'use strict';

	var plugin_name = '{{플러그인 이름}}';

	if ( !$.fn[plugin_name] ) {
		$.fn[plugin_name] = function() {
			var $this = this;

			return $.each($this, function(index, el){
				var _$item = $this.eq(index); // jQuery 인스턴스 객체

				// 플러그인 코드
			});
		};
	}

})(window, window.jQuery);
```

**4.** 객체지향 프로그래밍 설정
```js
(function(global, $){
	'use strict';

	var plugin_name = '{{플러그인 이름}}';

	// 생성자 함수
	var ConstructorFn = function(el) {
		this.el = el;
	};

	// 생성자 프로토타입 객체
	ConstructorFn.fn = ConstructorFn.prototype = {
		// 초기화 메소드
		init: function() {

		}
	};

	if ( !$.fn[plugin_name] ) {
		$.fn[plugin_name] = function() {
			var $this = this;

			return $.each($this, function(index, el){
				var _$item = $this.eq(index);

				new ConstructorFn(el);
			});
		};
	}

})(window, window.jQuery);
```

**5.** 사용자정의/기본 옵션 설정
```js
(function(global, $){
	'use strict';

	var plugin_name = '{{플러그인 이름}}';

	var ConstructorFn = function(el, options) {
		this.init(el, options)
	};

	ConstructorFn.fn = ConstructorFn.prototype = {
		init: function(el, options) {
			// 사용자 정의 옵션 >> 기본 옵션 = 병합
			options = $.extend({}, $.fn[plugin_name].defaults, options);

			// 이벤트 메소드 실행
			this.events();
		},
		events: function() {

		}
	};

	if ( !$.fn[plugin_name] ) {
		// options - 사용자 정의 옵션 설정
		$.fn[plugin_name] = function(options) {
			var $this = this;

			return $.each($this, function(index, el){
				var _$item = $this.eq(index);

				// 생성자 함수에 options 전달
				new ConstructorFn(el, options);
			});
		};

		// 플러그인 초기 옵션 설정
		$.fn[plugin_name].defaults = {

		};
	}

})(window, window.jQuery);
```