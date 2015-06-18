## jQuery 플러그인 제작 기초

```js
require(['detectizr', 'jquery'], function(Detectizr, $) {

    // jQuery.prototype의 별칭 fn
    // jQuery.prototype === jQuery.fn

    // $.fn.{플러그인}이 존재하는지 유무 체크
    if( !$.fn.setHeight100vh ) {
        // 플러그인이 존재하지 않으면 $.fn.{플러그인} 모듈 정의
        $.fn.setHeight100vh = function() {

            // jQuery 플러그인 쉘 내부의 this는 jQuery 인스턴스 객체를 가리킴.
            // console.log(this);

            // 플러그인 적용 코드
            this.css('height', '100vh');

            // jQuery 체이닝 방식을 위한 this 객체 반환
            return this;
        };
    }

    if( !$.fn.redify ) {
        $.fn.redify = function() {
            this.css('background', '#FC414B');
            return this;
        };
    }

    // 플러그인 실행 코드
    $('#page')
        .setHeight100vh()
        .redify()
        .addClass('wrapper');

});
```