## 웹 접근성을 고려한 jQuery 플러그인 제작 과정

- [1일차 내용 요약](DOC/DAY01.md)
- [2일차 내용 요약](DOC/DAY02.md)
- [3일차 내용 요약](DOC/DAY03.md)
- [4일차 내용 요약](DOC/DAY04.md)

---

## 함수 사용법
- 함수 선언식
- 함수 표현식
- 즉시 실행함수

###### 함수 선언식
```js
// function 함수이름() {}
function show() {}
```

###### 함수 표현식
```js
// var 함수이름 = function() {};
var show = function () {};
```

###### 즉시 실행함수
```js
// (function() {})()
(function (global) {
    console.log(global); // window, this
    // 지역....
    // var를 붙여야 지역변수
    // 전역을 통해 다른 모듈과 공유하려면
    // 명시적으로 global을 사용한다.

})(window !== undfined ? window : this)
```

### 함수는 별도의 공간(Scope)을 형성
- 호이스트(Hoist)
- 가급적 `var`를 붙여서 지역 변수 생성
- 필요하다면 명시적으로 `global`을 붙여서 외부 모듈과 공유

### 전역(Window)은 오염시키지 않는 것이 중요!!!

