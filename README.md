## 웹 접근성을 고려한 jQuery 플러그인 제작 과정

- [01일차 내용 요약](DOC/DAY01.md)
- [02일차 내용 요약](DOC/DAY02.md)
- [03일차 내용 요약](DOC/DAY03.md)
- [04일차 내용 요약](DOC/DAY04.md)
- [05일차 내용 요약](DOC/DAY05.md)
- [06일차 내용 요약](DOC/DAY06.md)
- [07일차 내용 요약](DOC/DAY07.md)
- [08일차 내용 요약](DOC/DAY08.md)
- [09일차 내용 요약](DOC/DAY09.md)
- [10일차 내용 요약](DOC/DAY10.md)
- [11일차 내용 요약](DOC/DAY11.md)

---

## OOJS 스타일로 리팩토링([ReFactoring](https://ko.wikipedia.org/wiki/%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81))

```js
define([
	'jquery.utils',
],
function() {
	'use strict';

	// 플러그인 이름
	var plugin = 'skipNav';

	// 플러그인에 적용될 객체
	var _skipNav = {

		// 초기화 수행
		'init': function($el, options, callback) {
			// 플러그인 적용 요소 참조
			this.$el      = $el.eq(0);
			this.$links   = this.$el.find('a');
			// 옵션 설정
			this.settings = $.extend(true, {}, $.fn[plugin].defaults, options);
			// 객체 멤버 메소드 실행
			this.controls();
			this.events();
			// 객체 리턴
			return this;
		},

		// 객체 컨트롤
		'controls': function() {
			// 요소에 클래스 속성 설정
			this.$el.addClass(this.settings.containerClass);
			this.$links
				.addClass(this.settings.linkClasses.hidden + ' ' + this.settings.linkClasses.focusable)
				// WAI-ARIA 상태 속성 적용
				.attr('aria-hidden', true);
		},

		// 객체 이벤트
		'events': function() {
			this.$el
				// 클릭 이벤트
				// $.proxy() 유틸리티 메소드를 활용한 콘텍스트 설정
				.on('click', 'a', $.proxy(this.linksAction, this))
				// 포커스/블러 이벤트
				.on('focusin focusout', 'a', this.toggleHidden);
		},

		// 클릭 이벤트 핸들러
		'linksAction': function(e) {
			// 브라우저 기본동작 차단
			e.preventDefault();
			// href 속성 값을 path 변수에 참조
			var path = e.target.getAttribute('href');
			// 목적지 대상(콘테이너 요소) 탐색
			// $.$() 유틸리티 메소드를 활용한 캐시 데이터 활용
			var $target = $.$(path);
			// 옵션 체크를 통해 조건 분기
			if( this.settings.setContainerFocuing ) {
				$target
					// 비 포커스 요소에 tabindex 속성 설정
					.attr('tabindex', 0)
					.focus()
					.on('blur', $.proxy(this.setTabIndexMinus, $target));

			} else {
				$target.find('*:focusable').eq(0).focus();
			}
			// 옵션 체크를 통해 조건문 실행
			this.settings.setHash && (window.location.hash = path);
		},

		// tabindex 속성 상태 변경
		'setTabIndexMinus': function() {
			// console.log(this); // _skipNav 객체
			this.attr('tabindex', -1);
		},

		// 포커스 이벤트 핸들러
		// WAI-ARIA 상태 변경
		'toggleHidden': function(e) {
			var $link = $.$(this);
			// 이벤트 타입을 체크하여 코드 분기 (상태 변경)
			if (e.type === 'focusin') {
				$link.attr('aria-hidden', false);
			} else {
				$link.attr('aria-hidden', true);
			}
		}
	};


	// 플러그인 존재 유무 확인
	if( !$.fn[plugin] ) {

		// 플러그인 정의
		$.fn[plugin] = function(options, callback) {

			// _skipNav 객체 초기화 수행
			var __skipNav = _skipNav.init(this, options, callback);

			// _skipNav 객체 재 접근을 위한 데이터 참조 처리
			this.data('_skipNav', __skipNav);

			// jQuery 체이닝을 위한 인스턴스 리턴
			return this;

		};

		// 플러그인 초기 옵션 값 설정
		$.fn[plugin].defaults = {
			'containerClass': 'skipNav-container',
			'linkClasses': {
				'hidden': 'a11y-hidden',
				'focusable': 'focusable'
			},
			'setHash': true,
			'setContainerFocuing': true
		};
	}

});
```

### Google 클로저 컴파일러 서비스 (Closure Compiler Service)
[Closure Compiler](http://closure-compiler.appspot.com/home)

### Cordova - Android v4.1 viewport scaling

<!-- http://stackoverflow.com/questions/24636515/android-4-1-viewport-scaling-setinitialscale-meta-initial-scale-not-working -->

Cordova를 활용해 제작한 모바일 앱이 Android 기기에서 `<meta>` 요소의 initial-scale 속성이 적용되지 않는 문제

** `<meta>` 설정이 적용되지 않는 문제 **
```html
<meta name="viewport" content="user-scalable=no, initial-scale=0.5, width=device-width, height=device-height, target-densitydpi=device-dpi" />
```

** 사용자정의 함수를 활용한 해결책 **
```js
// Android <= 4.2 chromium 기반의 4.2+ 웹뷰에서 모두 동작함.
function customScaleThisScreen()
	var contentWidth = document.body.scrollWidth,
		windowWidth  = window.innerWidth,
		newScale     = windowWidth / contentWidth;
	document.body.style.zoom = newScale;
}
```