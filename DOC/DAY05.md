[＜ README.md](../README.md)

---

## jQuery 플러그인 제작 - radioClass

```js
define(['jquery'], function($) {
    'use strict';

    // $.fn은 jQuery 프로토타입(prototype)을 말합니다.
    // $.fn 객체의 메소드 중, radioClass가 없을 경우 조건문이 실행됩니다.
    if (!$.fn.radioClass) {

        // $.fn 객체의 radioClass 메소드 정의
        // 전달인자 {name} @string
        $.fn.radioClass = function(name) {

            // 전달인자 유효성 검사 (다음 시간에 배웁니다)
            if ( $.type(name) !== 'string' ) { throw new TypeError(); }

            // 플러그인 함수 내부에서 this는 jQuery 인스턴스 객체를 가리킵니다.
            // $('a.me').radioClass()의 경우, this는 $('a.me')를 가리키는거죠.
            // 플러그인이 연결된 jQuery 인스턴스 객체에 name 클래스 속성을 추가합니다.
            this.addClass(name);

            // radioClass의 목적 그대로 형제 요소노드에서는 name 클래스 속성을
            // 제거해야 하니 형제 요소노드를 찾아 변수 $siblings에 참조합니다.
            // jQuery 인스턴스 메소드 중, .siblings()는 형제 요소노드를 찾아
            // 집합(jQuery 인스턴스 객체)을 반환합니다.
            var $siblings = this.siblings();

            // 오늘 수업의 핵심인 jQuery 유틸리티 메소드 $.each()를 사용하여
            // $siblings 집합을 탐색하여 수집된 요소노드 개수만큼 반복 처리합니다.
            // 쉽게 말해 반복 구문(for, while문 등)을 사용한 겁니다.
            // ECMAScript v5 [].forEach() 문과 유사합니다. (전달인자 순서는 반대)
            $.each($siblings, function(index, item) {

                // $() 팩토리 함수를 가급적 사용하지 않는 것이 성능 고려에 있어
                // 주요한 점이니, .eq() 인스턴스 메소드를 사용하여 수집된
                // $siblings에서 index에 해당되는 원소(item)을 꺼내
                // $item 변수에 참조합니다.
                var $item =  $siblings.eq(index);

                // $item에 참조된 요소에 name 클래스 속성 값이 포함되어 있는지
                // 확인합니다.
                if ( $item.hasClass(name) ) {

                    // name 클래스 속성이 포함되어 있다면, 이를 제거합니다.
                    $item.removeClass(name);
                }

                // 네이티브 DomScript에서는 아래와 같은 방법을 사용합니다.
                // IE 10+ 이상 부분 지원합니다. (IE Edge부터 완벽 지원)
                // if (item.classList.contains(name) ) {
                //  item.classList.remove(name);
                // }

            });

            // jQuery 체이닝(Chaning)을 고려한다면, this를 반환합니다.
            // this는 jQuery 인스턴스 객체
            return this;

        }

    }

});
```