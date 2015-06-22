[＜ README.md](../README.md)

---

### Javascript 함수 패턴

- 함수 선언식
- 함수 표현식
- 즉시 실행함수
- 생성자 함수
    - 다른 언어의 클래스(Class)와 유사한 개념
    - `new` 연산자를 생성자 함수 이름 앞에 붙여 사용하면 객체 인스턴스를 생성함.
    - 생성자 함수의 경우, 관례상 이름 첫 글자를 대문자로 작성.
    - 객체 생성(Create) / 상속(Inheritance) / 초기화(Initialization)


#### 함수 선언식 `Function Expressions`

```js
/**
 * 작성 방법
 * function 함수이름() {}
 */
function showMenu() {}
```

#### 함수 표현식 `Function Declations`

```js
/**
 * 작성 방법
 * var 함수이름 = function() {};
 */
var showMenu = function () {};
```

#### 즉시 실행함수 `Self-Excuting Anonymous Functions`

```js
/**
 * 작성 방법
 * (function(){})() 또는 (function(){}())
 */
(function (global, undefined) {
	// 독립된 공간(Scope)에 코드 작성
})(window !== undefined ? window : this);
```


#### 함수는 별도의 독립된 공간(Scope)을 형성

```js
/**
 * 오늘날 자바스크립트는 전역(Window) 공간을 오염시키지 않는 것이 중요!!!
 * 필요하다면 명시적으로 `global`을 붙여서 외부 모듈과 공유
 * 가급적 `var`를 붙여서 지역 변수 생성
 */
(function (global, undefined) {

	// 지역 내에서만 사용 가능한 로컬 함수
	var _localFn = function() {
		// ....
	};

	// 전역 변수 gFn에 로컬 함수 _localFn 참조 (전역 공유)
	global.gFn = _localFn;

})(window !== undfined ? window : this);
```


#### 함수 내부에서 `this`가 참조하는 대상

```js
// 일반함수
function normalFn() {
	console.log(this); // 함수가 실행되는 컨텍스트(문맥)
};

// 일반함수 실행
normalFn();                                              // this === window
document.onclick = normalFn;                             // this === document
document.querySelector('a.ext').onmouseenter = normalFn; // this === a.ext


// 생성자 함수
function ConstructorFn() {
	console.log(this); // 생성자 함수 내 this는 생성된 객체를 가리킴.
}

// new 연산자를 붙여 생성자 함수 실행 - 객체 생성
var instance = new ConstructorFn; // this === instance 객체
```


#### 생성자 함수 사용 예

Navigation 객체 생성자와 프로토타입

```js
// 객체 생성하는 함수 : 생성자 함수 (Constructor Function)
function Navigation(el) {
	this.el             = document.querySelector(el);
	this.children       = this.el.querySelectorAll('a');
	this.childrenLength = this.children.length;
};

// 생성자 함수의 프로토타입 : 생성되는 객체의 원형(Prototype)
Navigation.prototype = {
	nextLink : function() {
		console.log(this.el, '다음 링크 활성화');
	},
	prevLink : function() {
		console.log(this.el, '이전 링크 활성화');
	},
	goToLink : function(num) {
		console.log(num + '링크 활성화');
	},
	playRollingLinks : function() {
		console.log('링크 롤링 시작');
	},
	stopRollingLinks : function() {
		console.log('링크 롤링 중지');
	}
};

// Navigation 인스턴스 객체 생성
var hNav = new Navigation('header nav');
var aNav = new Navigation('aside nav');
var mNav = new Navigation('main nav');
var fNav = new Navigation('footer nav');

// Navigation 인스턴스 객체 메소드 활용
hNav.nextLink();
mNav.prevLink();
```