[＜ README.md](../../README.md)

-

#### 1. DOM을 캐싱(`Caching`)하라.

한번 탐색한 DOM을 다시 탐색하는 것은 비효율적이기 때문.

Bad
```js
$('button.confirm').on('click', function() {
	// DOM 한번 탐색
	$('.modal').modal();

	// DOM 다시 한번 탐색
	$('.modal').addClass('active');

	// DOM 또 다시 한번 탐색
	$('modal').css(...);
});
```

Good
```js
$('button.confirm').on('click', function() {
    // DOM 한번만 탐색 (체이닝)
    $('.modal')
        .modal()
        .addClass('active')
        .css(...);
});

$('button.confirm').on('click', function() {
    // DOM 한번만 탐색 (캐시)
    var modal = $('.modal');

    modal.modal();
    modal.addClass('active');
    modal.css(...);
});
```

#### 2. 가급적 전역(`Global`)을 오염시키지 마라.

전역 변수를 무분별하게 사용할 경우, 코드 충돌이 발생.

Bad
```js
$element = $('.element');
h = $element.height();
$element.css('height',h-20);
```

Better
```js
var $element = $('.element');
var h = $element.height();
$element.css('height',h-20);

#### 3. 명시적으로 `$` 식별자를 사용하라. (Hungarian Notation)

jQuery 객체를 참조한 변수 이름 앞에 $를 붙여 jQuery를 사용 가능한 객체임을 식별케하는게 혼란스럽지 않으니까.

Bad
```js
var first  = $('.first');
var second = $('.second');
var value  = $first.val();
```

Better
```js
var $first  = $('.first');
var $second = $('.second');
var value   = $first.val();
```

#### 4. `var` 체이닝을 사용하라. (Single Var Pattern)

싱글 var 패턴을 활용하면, var 중복 사용을 줄일 수 있으니까.

Bad
```js
var first  = $('.first');
var second = $('.second');
var value  = $first.val();
```

Better
```js
var $first  = $('.first'),
	$second = $('.second'),
	value   = $first.val();

#### 5. `on`메소드 사용을 선호하라.

단! jQuery 1.7 버전 이상부터 on을 지원한다는 사실을 잊지말 것~!

Bad
```js
$first.click(function(){
	$first.css('border','1px solid red');
	$first.css('color','blue');
});

$first.hover(function(){
	$first.css('border','1px solid red');
});
```

Better
```js
$first.on('click', function(){
	$first.css('border','1px solid red');
	$first.css('color','blue');
});

$first.on('hover', function(){
	$first.css('border','1px solid red');
});

#### 6. 묶을 수 있으면 최대한 묶어라. (간결화)

하나의 요소에 연결된 프로세스를 진행하고, 진행하는 것보다는 한번에 진행하는게 빠르니까.

Bad
```js
$first.click(function(){
	$first.css('border','1px solid red');
	$first.css('color','blue');
});
```

Better
```js
$first.on('click',function(){
	$first.css({
		'border':'1px solid red',
		'color':'blue'
	});
});
```

#### 7. 문장을 연결(Chaining)되도록 묶어라.

하나의 객체에 메소드를 묶으면 진행될 프로세스를 이해하기 쉬우니까.

Bad
```js
$second.html(value);
$second.on('click',function(){
	alert('hello everybody');
}).fadeIn('slow').animate({height:'120px'},500);
```

Better
```js
$second
	.html(value)
	.on('click',function(){alert('hello everybody');})
	.fadeIn('slow')
	.animate({height:'120px'}, 500);
```

#### 8. 읽기 쉬운 코드를 만들라.

읽기 불편한 코드보다는 읽기 쉬운 코드가 수정이 용이하니까.

Bad
```js
$second.html(value);
$second.on('click',function(){
	alert('hello everybody');
}).fadeIn('slow').animate({height:'120px'},500);
```

Better
```js
$second
	.html( value )
	.on( 'click', function(){
		alert('hello everybody')
	} )
	.fadeIn( 'slow' )
	.animate( {height:'120px'}, 500 );
```

#### 9. &&, || 등을 활용하여 코드 량을 줄여라.

티끌모아 태산이라고 줄인 코드량은 용량과 관련되니까.

Bad
```js
function initVar($myVar) {
	if(!$myVar) {
		$myVar = $('.selector');
	}
}
```

Better
```js
function initVar($myVar) {
	$myVar = $myVar || $('.selector');
}
```

#### 10. 가급적 코드 양을 줄일 수 있으면 줄여라.

티끌모아 태산이라고 줄인 코드량은 용량과 관련되니까.

Bad
```js
if ( collection.length > 0 ) {}
```

Better
```js
if ( collection.length ) {}
```

#### 11. DOM 조작이 많을 경우, 분리(`detach`) 적용하여 붙여라.

문서에 붙여진 상태에서 다수의 DOM 조작은 비효율적이니까. 조작하고 다시 붙이는게 나으니까.

Bad
```js
var $container   = $(".container"),
	$containerLi = $(".container li"),
	$element     = null;

$element = $containerLi.first();
// $element에 다수의 조작(Manipulation)이 수행
```

Better
```js
var $container = $(".container"),
	$containerLi = $container.find("li"),
	$element = null;

$element = $containerLi.first().detach();
// $element에 다수의 조작(Manipulation)이 수행

$container.append($element);
```

#### 12. jQuery 유틸리티 메소드를 사용하라.

인스턴스 메소드 형태보다 유틸리티 활용이 보다 빠르니까.

Bad
```js
$('#id').data(key,value);
```

Better
```js
// var idEl = document.querySelector('#id');
var idEl = $('#id')[0];
$.data(idEl, key, value);
```

#### 13. jQuery 객체를 참조한 변수를 통해 대상을 탐색하라.

DOM 캐시와 같은 이유로 한번 참조한 대상을 통해 내부를 탐색하는게 빠르니까.

Bad
```js
var $container       = $('.container'),
	$containerLi     = $('.container li'),
	$containerLiSpan = $('.container li span');
```

Better
```js
var $container       = $('.container '),
	$containerLi     = $container.find('li'),
	$containerLiSpan = $containerLi.find('span');
```

#### 14. 전체 선택자(`*`) 사용을 줄여라.

`*` 사용은 속도를 느리게 만드는 주범이니까.

Bad
```js
$('.container > *');
```

Better
```js
$('.container').children();
```

#### 15. 암묵적 선택자보다는 명시적 선택자를 활용하라.

암묵적 선택자 사용은 결국 `*` 사용하는 것이라 느림.

Bad
```js
$('.someclass :radio');
```

Better
```js
$('.someclass input:radio');
```

#### 16. `ID` 선택자 사용 시에는 앞에 요소 이름을 제거하라.

문서에는 단 하나의 ID 이름을 사용해야하니, 중복될리 없으니까.

Bad
```js
$('div#myid');
$('div#footer a.myLink');
```

Better
```js
$('#myid');
$('#footer a.myLink');
```

#### 17. `ID` 내부의 `ID`를 찾는 것은 어리석은 일이다.

고유한 ID 영역 내부에서 찾는데 굳이 상위 영역 식별자까지 사용할 필요가 없으니까.

Bad
```js
$('#outer #inner');
```

Better
```js
$('#inner');
```

#### 18. 가급적 최신 버전의 jQuery를 사용하라

업그레이드된 최신버전이 속도, 기능면에서 나으니까. 단, 2.x 버전부터는 IE 6,7,8이 고려되지 않음에 주의!

#### 19. 사라질 메소드는 사용하지 마라.

상위 버전의 jQuery에서 사라질(Deprecated) 것들은 사용하지 않는게 좋으니까. (호환성 문제)

Bad
```js
$('.stuff').live('click', function() {
	console.log('hooray');
});
```

Better
```js
$('.stuff').on('click', function() {
	console.log('hooray');
});
```

#### 20. 프로젝트의 최종 단계에서는 jQuery CDN을 사용하라.

CDN 사용시, 사용자의 가까운 곳에서 데이터를 가져오니 속도 향상에 도움이 되니가.

#### 21. jQuery만 사용하기 보다는 JS와 함께 사용하라.

jQuery는 결국 Javascript일 뿐더러, 속도면에서 jQuery 보다 Javascript가 빠르니까.


<!-- SECRET LINKS -->
<!-- -[Become a Professional JavaScript Developer with Tuts+ Courses](https://code.tutsplus.com/articles/become-a-professional-javascript-developer-with-tuts-courses--cms-21095?utm_source=Tuts+&utm_medium=website&utm_campaign=relatedtutorials&utm_content=sidebar&WT.mc_id=Tuts+_website_relatedtutorials_sidebar)
- [The Essentials of Writing High Quality JavaScript](https://code.tutsplus.com/tutorials/the-essentials-of-writing-high-quality-javascript--net-15145)
- [24 JavaScript Best Practices for Beginners](https://code.tutsplus.com/tutorials/24-javascript-best-practices-for-beginners--net-5399) -->