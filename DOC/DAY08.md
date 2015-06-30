[＜ README.md](../README.md)

---

### jquery.plugin.startKit

```sh
.
├── css
│   └── style.css
├── index.html
├── js
│   ├── libs
│   │   ├── jquery.min.js
│   │   ├── qunit
│   │   │   ├── qunit.css
│   │   │   ├── qunit.js
│   │   │   └── theme
│   │   │       ├── qunit-theme-burce.css
│   │   │       ├── qunit-theme-gabe.css
│   │   │       ├── qunit-theme-ninja.css
│   │   │       └── qunit-theme-nv.css
│   │   └── require.js
│   ├── main.js
│   └── plugins
│       ├── yamoo9.jquery.expr.js # 플러그인
│       └── yamoo9.jquery.util.js # 플러그인
└── test
    ├── test.css
    ├── test.html
    ├── test.js
    ├── yamoo9.jquery.expr.test.js # 플러그인 테스트
    └── yamoo9.jquery.util.test.js # 플러그인 테스트
```

-

### jQuery 유틸리티 메소드 확장

```js
define([
  'jquery'
],
function($) {
  'use strict';

  /**
   * jQuery 표준
   * $.fn.jquery, $().jquery
   * ----------------------------
   * 사용자 정의
   * $.version
   */
  if (!$.version) {
    $.version = $().jquery;
  }

  /**
   * jQuery 표준
   * $.expr[':']
   * ----------------------------
   * 사용자 정의
   * $.ex
   */
  if (!$.ex) {
    $.ex = $.expr[':'];
  }

  /**
   * Console 표준
   * console.log()
   * ----------------------------
   * 사용자 정의
   * $.log()
   */
  if (!$.log) {
    $.log = function(arg) {
      if (window.console) {
        console.log(arg);
      }
    };
  }

  /**
   * jQuery 표준
   * $(this) x α
   * ----------------------------
   * 사용자 정의
   * $.$(this)
   */
  if ( !$.$ ) {
    $.$ = function(el) {
      // if ( !$.data(el, '@this') ) {
      //  $.data(el, '@this', $(el));
      // }

      // return $.data(el, '@this');
      //
      return $.data(el, '@this') || $.data(el, '@this', $(el));
    }
  }

  /**
   * jQuery 표준
   * $(el), $(el).index(), meta[3]
   * ----------------------------
   * 사용자 정의
   * config.el, config.index, config.meta
   */
  $.$config = function(el, meta) {
    return {
      el    : $.$(el),
      index : this.el.index(),
      meta  : (meta ? meta[3] : null)
    };
  };

});
```

-

### jQuery.expr[':'] 확장

```js
define([
  'jquery',
  'yamoo9.jquery.util'
],
function($) {
  'use strict';

  /**
   * 참고 URL
   * https://coderwall.com/p/gdt7ga/custom-jquery-selectors-using-expressions
   * http://www.webgeekly.com/tutorials/jquery/create-custom-jquery-selectors-to-speed-up-development/
   * http://malsup.com/jquery/expr/
   */

  /**
   * jQuery 표준
   * $('span[class*="icon-"]');
   * ----------------------------
   * 사용자 정의
   * $('span:icon');
   */
  $.expr[':'].icon = function(el, index, meta) {
    return el.className.toLowerCase().match('icon-');
  };

  /**
   * jQuery 표준
   * $('span[class*="icon-"][class*="-mega"]');
   * ----------------------------
   * 사용자 정의
   * $("span:icon(mega)");
   */
  $.expr[':'].icon = function(el, index, meta) {
    var _meta = meta[3],
      cn = el.className.toLowerCase();
    return _meta ? ( cn.match('icon-') && cn.match(_meta) ) : cn.match('icon-');
  };

  /**
   * 사용자 정의 디버깅
   * $('span:first:debug');
   */
  $.expr[':'].debug = function(el, index, meta) {
    console.log('--- DEBUG ---', '\nel: ', el, '\nindex: ', index, '\nmeta: ', meta[3], '\n--- // DEBUG ---');
    // console.log('--- DEBUG ---');
    // console.log('el: ', el);
    // console.log('index: ', index);
    // console.log('meta: ', meta[3]);
    // console.log('--- // DEBUG ---');
  };

  /**
   * jQuery 표준
   * $('span:nth-child(3n)');
   * ----------------------------
   * 사용자 정의
   * $('span:nth(3)');
   */
  $.expr[':'].nth = function(el, index, meta) {
    var config = $.$config(el, meta);
    if(!config.meta) { throw new TypeError(':nth(3)처럼 () 안에 숫자 값을 넣어주세요.'); }
    return (config.index + 1) % config.meta === 0;
  };

  /**
   * jQuery 표준
   * $('span').each(function(index, el) { return $(this).css('display') === 'block' });
   * -----------------------------------------------------------------------------------
   * 사용자 정의
   * $('span:block');
   */
  var filter = 'inline, inline-block, block, list-item'.split(', '),
    k      = 0,
    l      = filter.length;

  for(; k<l; k++) {
    (function(display_value){
      $.expr[':'][display_value] = function(el, index, meta) {
        var config = $.$config(el, meta);
        return config.el.css('display') === display_value;
      }
    })(filter[k]);
  }

  /**
   * jQuery 표준
   * $("a.btn.new-repo").data("button", "new-repo");
   * ----------------------------
   * 사용자 정의
   * $("a:button(new-repo)");
   */
  $.expr[':'].btn = function(el, index, meta) {
    var config = $.$config(el, meta);
    return config.el.hasClass('btn') && config.el.data('btn', config.meta);
  };

});
```

-

### QUnit 비동기 실행
```js
<<<<<<< HEAD
(function(global, Q, $){
	'use strict';

	var class_name = 'clicked';

	// QUnit 모듈 정의
	Q.module('jquery.radioClass', {
		beforeEach: function() {
			var self = this;
			self.name = class_name;
			self.$demo = $('#demo');
			self.$demo.on('click', 'li > a', function(e) {
				e.preventDefault();
				$(this).radioClass( self.name, 'li' );
			});
		}
	});

	Q.test('jQuery v1.x 버전을 사용하는가?', 2, function(A) {
		// A.expect(2);
		A.strictEqual($, window.jQuery, 'jQuery 사용 준비 완료!');
		A.ok($.fn.jquery[0] === '1', 'jQuery 1.x 버전대 사용!');
	});

	Q.test('$.fn은 jQuery.prototype인가?', function(A){
		A.strictEqual($.fn, jQuery.prototype, '$.fn은 jQuery.prototype이 맞습니다.');
	});

	Q.test('$.fn.radioClass가 존재하는가?', function(A){
		A.ok($.fn.radioClass, '존재합니다.');
	});

	Q.test('#demo li:first-child > a 요소의 부모 요소에 "'+ class_name +'" class 속성이 추가되었는가?', function(A) {
		var _demo = this.$demo,
			_demo__a = _demo.find('li:first-child > a').trigger('click');
		A.ok(_demo__a.parent().hasClass(this.name));
	});

})(window, window.QUnit, window.jQuery);
=======
require([
  'jquery.radioClass.test'
],
function() {

  /**
   * ------------------------------------
   * QUnit 비동기 실행
   * http://api.qunitjs.com/QUnit.start/
   * http://api.qunitjs.com/QUnit.config/
   * ------------------------------------
   */

  // QUnit.config.autostart = false;
  QUnit.start();

});
>>>>>>> DAY08
```

-

### jQuery 유틸리티 메소드
유틸리티 메소드는 정적 메소드(Static Method)로 jQuery 함수의 속성을 말합니다.

```js
// jQuery Utility Methods 예시
jQuery.each();
$.ajax();
$.proxy();
.
.
.
```

-

#### 데이터 유형 체크 jQuery 유틸리티 메소드(함수)

```js
$.isNumeric(number);
$.isFunction(function);
$.isArray(array);
$.isEmptyObject(object);
$.isPlainObject(object);
$.isXmlDoc(doc);
$.type(object); // ★★★★★
```

##### `$.type` 함수가 반환하는 데이터 유형
- `number` - 숫자
- `string` - 문자
- `boolean` - 논리
- `function` - 함수
- `array` - 배열
- `object` - 객체
- `date` - 날짜
- `regexp` - 정규표현식
- `undefined`
- `null`

-

[DEMO v1](http://jsbin.com/vubefujowu/2/edit?js,output)

```js
var callToAction, callbackFn;

callToAction = function (count, delay, fn) {
  var i = 0;

  (function loopIt(){
    i++;
    fn();
    if (i < count) {
      setTimeout(loopIt, delay);
    }
  }());
};

callbackFn = function () {
  $('.out').append('<p>function called</p>');
};

callToAction(3, 400, callbackFn);
```

[DEMO v2](http://jsbin.com/zimuvunura/2/edit?js,output)

```js
var callToAction, callbackFn;

callToAction = function () {
  var args = arguments; // 함수 전달인자 유사배열
  var count = $.isNumeric(args[0]) ? args[0]: 3;
  var delay = $.isNumeric(args[1]) ? args[1]: 400;
  var fn = $.isFunction(args[0]) ?
              args[0] :
              $.isFunction(args[1]) ?
                args[1] :
                args[2];

  var i = 0;

  (function loopIt(){
    i++;
    fn();
    if (i < count) {
      setTimeout(loopIt, delay);
    }
  }());
};

callbackFn = function () {
  $('.out').append('<p>함수 호출됨.</p>');
};

callToAction(6, 200, callbackFn);
```

-

#### 콜렉션 조작(Collection Manipulation) 유틸리티 메소드
- makeArray
- inArray
	- return 1 또는 index
	- 전달인자(옵션)
- unique
- merge
- map
	- $().map()
	- $.map()
- grep
	- 전달인자 반전
	- return 배열

[데모](http://jsbin.com/qatomelozo/1/edit?js,console)

```js
/**
 * makeArray : 배열로 만듬
 * inArray : 배열 내부에 아이템이 존재할 경우, 인덱스 반환
 * $.inArray(item, array);
 * unique : 중복되는 배열 원소를 하나만 남겨둠
 * $.unique(array);
 * merge : 배열을 병합
 * $.merge(array1, array2);
 * map : 배열 원소를 순환하여 처리한 결과를 각 원소에 반영 후 반환
 * $.map(array, function(item, idx){});
 * grep : 특정 원소를 조건에 따라 솎아냄
 * $.grep(array, function(item, idx){})
 */

var arr1 = [2015, 6, 23, 6, 2015];
var arr2 = [2, 5, 8, 12, 11];

console.log($.isArray(arr1)); // true

console.log($.inArray(2015, arr1)); // 1

if ( $.inArray(2015, arr1) !== -1 ) {
  console.log('2015는 arr1 배열 내부 원소입니다.');
}

if ( $.inArray(9, arr2) !== -1 ) {
  console.log('9는 arr2 배열 내부 원소입니다.');
} else {
  console.log('9는 arr2 배열 내부 원소가 아닙니다.');
}

arr1 = $.unique(arr1);

console.log(arr1); // [2015, 6, 23]

var newArr = $.merge(arr1, arr2);

console.log(newArr); // [2015, 6, 23, 2, 5, 8, 12, 11]

arr2 = $.map(arr2, function(item, idx) {
  return parseInt( (item * item) / (idx===0 ? 2 : idx), 10 );
});

console.log(arr2); // [2, 25, 32, 48, 30]

newArr = $.grep(newArr, function(item){
   return item % 3 === 0;
});

console.log(newArr); // [6, 12]

$(function() {
  var mArr = $.makeArray( $('li') );
  console.log(mArr.length); // 7
});

```

-

### 온라인 Markdown 에디터
[Stackedit Editor](https://stackedit.io/)