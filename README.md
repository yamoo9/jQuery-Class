## 웹 접근성을 고려한 jQuery 플러그인 제작 과정

- [1일차 내용 요약](DOC/DAY01.md)
- [2일차 내용 요약](DOC/DAY02.md)
- [3일차 내용 요약](DOC/DAY03.md)
- [4일차 내용 요약](DOC/DAY04.md)
- [5일차 내용 요약](DOC/DAY05.md)
- [6일차 내용 요약](DOC/DAY06.md)
- [7일차 내용 요약](DOC/DAY07.md)

---

### 온라인 Markdown 에디터
[Stackedit Editor](https://stackedit.io/)

-

### QUnit 비동기 실행
```js
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
