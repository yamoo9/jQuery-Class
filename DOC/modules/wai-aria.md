### WAI-ARIA 역할(Role)의 분류와 기능

1. 위젯(Widget)

    - **패널 위젯 (Panel Widget)** <br>
    > 내용 또는 여러 위젯을 포함하고 있는 역할 <br>
    `alert`, `alertdialog`, `dialog`, `tooltip`, `gridcell`, `log`, `marquee` 등

    - **싱글 위젯 (Single Widget)** <br>
    > 한 번 클릭에 의해 기능을 실행하거나, 상태가 변경되는 단독 역할 <br>
    `link`, `button`, `checkbox` 등

    - **멀티 위젯 (Multi Widget)** <br>
    > 여러 위젯이 하나의 그룹을 이루어 내용 변경 또는
위젯간에 선택을 필요하는 역할<br>
    `menuitem`, `menuitemcheckbox`, `option`, `radio`, `scrollbar`, `slider` 등

    - **컴포지트 위젯 (Composite  Widget)** <br>
    > 하위 위젯들에 대한 별도의 콘트롤 방법이 필요한 역할 <br>
    `combobox`, `listbox`, `menu`, `menubar`, `radiogroup`, `tablist` 등


-

##### 역할(Role)에 대한 접근성 정보 예시


HTML 마크업 | 정보통신보조기기 해석
---|---
`<a href>홈</a>` | 홈 링크
`<a href role="button">홈</a>` | 홈 버튼
`<a href role="dialog">홈</a>` | 홈 대화상자
`<a href role="menuitem">홈</a>` | 홈 메뉴항목
`<a href role="listbox">홈</a>` | 홈 목록상자


