[＜ README.md](../README.md)

---

### jQuery.fn.dataLink() 플러그인 제작

**플러그인이 적용된 jQuery() 인스턴스 객체**가 참조하고 있는 **DOM 객체**에<br>
`data-linktext` 및 `role`, `rel` 속성을 동적으로 할당.

![jQuery.fn.dataLink](../GUIDE/jq-datalink.gif)

```js
/*! jquery.generate-dataLink-0.1.0.js © yamoo9.net, 2015 */
define([
  // 의존 모듈
],
function() {
  'use strict';

  // console.log('사용 중인 jQuery 버전은?\n', $().jquery);

  /**
   * --------------------------------
   * jQuery 플러그인 디자인 패턴
   * 이름 정의
   * 플러그인 유무 확인
   * 플러그인 작성
   * 플러그인 내부 this 참조 확인
   * 플러그인 체이닝 설정
   * --------------------------------
   */

  // 플러그인 존재 유무 확인
  if ( !$.fn.dataLink ) {

    /**
     * 플러그인 기본 옵션
     * 외부에서 접근 불가능 (영역 내 지역변수)
     */
    // var _default = '[href][class*="slide-btn-"]';


    // 플러그인 정의
    $.fn.dataLink = function(filterExp) {

      // $() 인스턴스 객체 self 변수에 filtering 하여 참조
      var self = this.filter( filterExp || $.fn.dataLink.default );

      // $() 인스턴스 집합에 개별적 플러그인 적용을 위한 $.each() 코드
      return $.each(self, function(index, item) {

          // 집합 내 개별 $() 인스턴스 객체 참조
        var $item      = self.eq(index),

          // href 속성 참조
          link_path  = $item.attr('href'),

          // 외부 링크 속성 여부 확인
          // RegExp를 활용한 방법: link_path.match(/^http:\/\//)
          isExternal = link_path.indexOf('http://') > -1,

          // isExternal 값이 참이면 && 뒤 코드 실행 (거짓이면 실행 X)
          linkFix    = isExternal && link_path.replace('http://', '');


        // isExternal 값이 참이면 && 뒤 코드 실행 (거짓이면 실행 X)
        // if ( isExternal ) {
        //  $item.attr('rel', 'external');
        // }
        isExternal && $item.attr('rel', 'external');

        // $item 인스턴스 객체에 .attr() 설정
        $item.attr({
          'role'          : 'button', // WAI-ARIA 1.0 역할 "버튼" 정의
          'data-linktext' : linkFix,  // data-linktext 설정
        });

      });

    };

    /**
     * 플러그인 기본 옵션
     * 외부에서 접근가능하게 설정
     */
    $.fn.dataLink.default = '[href][class*="slide-btn-"]';

  }
});
```

### 플러그인 - style.css
```css
@import url(http://fonts.googleapis.com/css?family=Exo+2:100);

html {
  font-size: 16px;
}

body {
  height: 100vh;
  margin: 0;
  color: #fff;
  background: #FC414B -webkit-linear-gradient(#fc414b, #931A25);
  background: #FC414B linear-gradient(#fc414b, #931A25);
  letter-spacing: -0.04em;
}

body * {
  margin: 0;
  font-family: "Exo 2", sans-serif;
  font-weight: 100;
}

a {
  color: inherit;
  line-height: 1.5;
}

h1 {
  margin-bottom: 24px;
  margin-bottom: 1.5rem;
}

p {
  margin-bottom: 1rem;
  color: #FACED2;
}

.container {
  max-width: 640px;
  max-width: 40rem; /* Root Element base EM */
  margin: 0 auto;
  padding-top: 100px;
  padding-top: 6.25rem;
}

/* 슬라이드 버튼 기본 스타일 모듈 */
a[class*="slide-btn-"] {
  display: inline-block;
  overflow: hidden;
  position: relative;
  border-bottom: 2px solid #EF747E;
  padding-right: 0.3em;
  padding-left: 0.3em;
  color: #fff;
  vertical-align: bottom;
  text-decoration: none;
}

a[class*="slide-btn-"]:hover,
a[class*="slide-btn-"]:focus {
  border-bottom-color: #34c0ff;
}

a[class*="slide-btn-"]::before {
  content: attr(data-linktext);
  position: absolute;
  color: #fff;
  background: #34C0FF;
  text-align: center;
  -webkit-transition: all 340ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  transition: all 340ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

/* 방향 스타일 초기화 모듈 */
a[class*="slide-btn-"]:hover::before,
a[class*="slide-btn-"]:focus::before {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

a[class*="slide-btn-"]:focus {
  outline: none;
}

/* 방향 스타일 모듈 */
a[class*="-left"]::before {
  right: 100%;
  left: -100%;
}

a[class*="-right"]::before {
  right: -100%;
  left: 100%;
}

a[class*="-top"]::before {
  top: -100%;
  bottom: 100%;
}

a[class*="-bottom"]::before {
  top: 100%;
  bottom: -100%;
}
```

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