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

### 수업 시간에 다룰 내용
- jQuery 사용자 정의 가상클래스 선택자 작성 (변경사항 중심)
- jQuery 메소드 오버라이딩
- jQuery skipNav, navigationMenu 플러그인 제작

-

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

### jQuery Navigation Menu 플러그인 제작 고려사항

##### 시멘틱 HTML 마크업
```html
<!-- nav 요소는 내비게이션 링크로 구성된 섹션을 의미합니다 - 내비게이션(Navigation) 역할 설정 -->
<nav>
	<!-- 메인 내비게이션 바 컨테이너 - 메뉴바(Menubar) 역할 설정 -->
	<ul>
		<!-- 레벨 1 - 프레젠테이션(Presentation) 역할 설정 -->
		<li>
			<!-- 하이퍼링크 - 메뉴 아이템(Menu Item) 역할 설정 -->
			<a href></a>
		</li>
		<li>
			<a href></a>
			<!-- 레벨 2 메뉴 컨테이너 - 메뉴(Menu) 역할 설정 -->
			<ul>
				<!-- 레벨 2 - 프레젠테이션(Presentation) 역할 설정 -->
				<li>
					<!-- 하이퍼링크 - 메뉴 아이템(Menu Item) 역할 설정 -->
					<a href></a>
				</li>
			</ul>
		</li>
	</ul>
</nav>
```

##### 스크린리더에 읽히는 콘텐츠 처리를 위한 클래스 설정
```css
.a11y-hidden {
	overflow: hidden;
	position: absolute;
	clip:     rect(0 0 0 0);
	clip:     rect(0,0,0,0);
	width:    1px;
	height:   1px;
	margin:   -1px;
	padding:  0;
	border:   0;
}

.a11y-hidden.focusable:focus,
.a11y-hidden.focusable:active {
	overflow: visible;
	position: static;
	clip:     auto;
	width:    auto;
	height:   auto;
	margin:   0;
}
```

-

##### 내비게이션 위젯에 접근성 향상을 위한 WAI-ARIA 적용
[WAI-ARIA](http://www.w3.org/TR/wai-aria/)는 RIA 웹 애플리케이션의 취약한 접근성을 개선하기 위한 목적으로 개발된 표준 접근성 API로, Javascript를 사용하여 HTML 문서에 역할, 속성, 상태 등을 정의할 수 있습니다. 이를 통해 웹 제작자는 웹 애플리케이션의 접근성을 향상시킬 수 있습니다.

- [WAI-ARIA 퀵 레퍼런스](http://www.w3.org/TR/wai-aria/appendices#quickref)
- [사이트 글로벌 내비게이션 제작 가이드](http://www.w3.org/TR/wai-aria-practices/#Site_Navigator_General)

-

###### 역할(Roles) 설정
- 내비게이션 요소(`<nav>` 또는 `<div>`)에 `role="navigation"` 역할 설정
- 내비게이션 바 요소(`<ul>`)에 `role="menubar"` 역할 설정
- 레벨 2 메뉴 컨테이너 요소(`<ul>`)에 `role="menu"` 역할 설정
- 읽히지 않아야 할 요소 `<li>` 요소에 `role="presentation"` 역할 설정
- 메뉴 아이템 요소(`<a>`)에 `role="menuitem"` 역할 설정

-

###### 속성(Properties) 설정
- 서브 메뉴를 펼쳐 줄 `<a>` 요소에 `aria-haspopup="true"` 속성 설정
- 레벨 2 `<ul>` 요소에 `aria-labelledby="<a>요소 ID 속성이름"` 속성 설정

-

###### 상태(States) 설정
- ~~현재 활성화(선택된) 상태의 `<a>` 요소는 `aria-selected="true"`로 상태 변경<br>
	반면 비활성화(선택되지 않은) 상태의 다른 `<a>` 요소는 `aria-selected="false"`로 상태 변경~~ [#참고](http://www.w3.org/TR/wai-aria/roles#menuitem)
- 현재 활성화(선택된) 상태의 `<a>` 요소는 `aria-describedby="상태 설명글 ID"`로 상태 변경<br> 내비게이션 메뉴 영역 내부에 `<span>`을 생성한 후, `id="i11y-current-desc"` 속성을 설정하고 현재 활성화된 상태를 작성
- 펼쳐진 상태의 `<ul>` 요소는 `aria-expanded="true"`로 상태 변경<br>
	펼쳐지지 않은 상태의 `<ul>` 요소는 `aria-expanded="false"`로 상태 변경
- 펼쳐진 상태의 `<ul>` 요소는 `aria-hidden="false"`로 상태 변경<br>
	펼쳐지지 않은 상태의 `<ul>` 요소는 `aria-hidden="true"`로 상태 변경
- 내비게이션 바 요소(`<ul>`)에 `aria-activedescendant="현재 포커스된 요소의 ID"`로 상태 변경
- 현재 활성화(선택된) 상태의 `<a>` 요소는 `tabindex="0"`로 상태 변경<br>
	반면 비활성화(선택되지 않은) 상태의 다른 `<a>` 요소는 `tabindex="-1"`로 상태 변경

-

###### 키보드(Keyboard) 설정 - [KWCAG 2.0, 운용의 용이성]
키보드 | 역할
--- | ---
탭(`Tab`) | 순방향으로 포커스 이동
시프트 탭(`Shift + Tab`) | 역방향으로 포커스 이동
레프트 애로우(`→`) | 이전 내비게이션 바 아이템으로 포커스 이동
라이트 애로우(`←`) | 다음 내비게이션 바 아이템으로 포커스 이동
톱 애로우(`↑`) | 이전 내비게이션 바 아이템으로 포커스 이동 (옵션)
바틈 애로우(`↓`) | 다음 내비게이션 바 아이템으로 포커스 이동 (옵션)
엔터(`Enter`), 스페이스(`Space`) | 현재 포커스된 아이템 활성화
