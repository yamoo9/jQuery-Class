## 웹 접근성을 고려한 jQuery 플러그인 제작 과정

- [1일차 내용 요약](DOC/DAY01.md)
- [2일차 내용 요약](DOC/DAY02.md)
- [3일차 내용 요약](DOC/DAY03.md)
- [4일차 내용 요약](DOC/DAY04.md)
- [5일차 내용 요약](DOC/DAY05.md)
- [6일차 내용 요약](DOC/DAY06.md)
- [7일차 내용 요약](DOC/DAY07.md)
- [8일차 내용 요약](DOC/DAY08.md)

---

### jQuery 사용자정의 확장

- `$`           - jQuery 유틸리티 메소드 확장
- `$.expr[':']` - jQuery 선택자 확장
- `$.fn`        - jQuery 플러그인 확장
- `$.fx.speeds` - jQuery 애니메이션 속도 확장
- jQuery 메소드 오버라이딩

-

##### jQuery 유틸리티 메소드 확장
```js
$.log = (function(){
	if( console ) {
		return function() {
			console.log.apply(console, arguments);
		};
	}
}());
$.group = (function(){
	if( console && console.group ) {
		return function(name) {
			console.group(name);
		};
	}
})();
$.groupEnd = (function(){
	if( console && console.groupEnd ) {
		return function() {
			console.groupEnd();
		};
	}
})();
```

-

##### jQuery 애니메이션 속도 확장
```js
$.log($.fx.speeds); // {_default: 400, slow: 600, fast: 200}
$.fx.speeds['very-fast'] = 100;
$.fx.speeds['very-slow'] = 800;
$.fx.speeds['1s'] = 1000;
```

-

##### jQuery 메소드 오버라이딩
```js
$.merge = (function(){

	$.origin       = $.origin || {};
	$.origin.merge = $.merge;

	return function() {
		var args = arguments,
			l    = args.length,
			i    = 1;

		for (; i<l; i++) {
			if (args[i]) {
				$.origin.merge(args[0], args[i]);
			}
		}

		return args[0];
	};
}());
```

-

##### jQuery 플러그인 디자인 패턴
- 플러그인 이름
- 플러그인 제작 기본 패턴
	- `(function(){})();`을 활용한 `$` 별칭 보호
	- 체이닝 설정
- 사용자 정의 옵션 설정
- 네임스페이스

-

###### 플러그인 이름 작성
`jquery.{{플러그인이름}}.js` 또는 `jquery.{{플러그인이름}}.1.0.0.js`

-

###### 플러그인 제작 기본 패턴
```js
(function(global, document, $){
	'use strict';
	$.fn[{{플러그인이름}}] = function() {
		var _this = this;
		return _this;
		// return _this.each(function(index, item){});
		// return _this.pushStack(element);
	};
})(window, document, window.jQuery);
```

-

###### 플러그인 사용자 정의 옵션 설정
```js
(function(global, document, $){
	'use strict';

	var settings = {};
	var defaults = {};

	$.fn[{{플러그인이름}}] = function(options) {
		var _this = this;

		// $.extend()를 활용한 객체 병합
		$.extend(settings, defaults, options);

		return _this;
	};
})(window, document, window.jQuery);
```

```js
(function(global, document, $){
	'use strict';

	var settings = {};

	$.fn[{{플러그인이름}}] = function(options) {
		var _this = this;

		// $.extend()를 활용한 객체 병합
		$.extend(settings, this[{{플러그인이름}}].defaults, options);

		return _this;
	};

	// 외부에서 $.fn[{{플러그인이름}}].defaults 기본 값 변경 가능
	$.fn[{{플러그인이름}}].defaults = {};

})(window, document, window.jQuery);
```