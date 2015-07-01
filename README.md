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

---

### jQuery.expr.pseudos 확장

사용자 정의 가상 선택자를 확장하는 `Sizzle` 엔진의 새로운 방법은 `jQuery.expr.createPseudo()` 메소드를 사용하는 것입니다. 이 메소드는 사용자가 직접 만든 가상 클래스 선택자에 메타 값을 입력할 경우만 사용하는데... 간단히 코드를 정리하면 다음과 같습니다.

```js
// jQuery.expr[':'] === jQuery.expr.pseudos
$.ex = $.expr;
$.ex[':'].btn = $.ex.createPseudo( function(meta){
	return function(el) {
		console.log(
			'--- el ---\n', el,
			'\n\n--- meta ---\n', meta
		);
	}
} );
```

그리고 아래와 같이 명령을 입력하면...

```js
$('a:btn(play)');
```

콘솔에 다음과 같이 출력됩니다.

```js
--- el ---
a

--- meta ---
play
```

그런데... 이런 방법을 어디에 사용하면 유용한걸까요?

예를 들어 <a> 요소의 클래스 속성 값이 'btn' 이고,
포함하는 문자열이 'play'인 요소를 찾고자 한다고 합시다.
해당되는 대상을 손쉽게 찾고자 가상 선택자를 만들고자 한다면?
아래와 같이 코드를 작성합니다.

```js
$.ex[':'].btn = $.ex.createPseudo( function(meta){
	return function(el) {
		return meta ?
			el.className.match(/btn/ig) && (el.textContent || el.innerText) === meta :
			el.className.match(/btn/ig);
	}
} );
```

그리고 난 후, 정의한 가상클래스 선택자 코드를 작성하여 실행하면 원하는 대상을 찾아줍니다.
즉, 사용자가 원하는 형태로 가상 클래스 선택자를 확장할 수 있다는 것이죠.

```js
$('a:btn(play)'); // <a class="btn">play</a>
```

###

```js
$.expr.pseudos.focusable = function(el) {
    el.focus(); // 요소에 포커스 설정
    return el === $.activeElement(); // 요소에 포커스가 설정되었는지 확인
};
```

---