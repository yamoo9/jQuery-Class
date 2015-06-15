// 모듈 정의
define(['jquery'], function($) {
	// 문서가 준비되면... DOMReady 되면...
	// require() 함수 내부의 콜백 함수는 DOMReady 된 이후 실행된다.

	var $body = $('body');

	// 만약 body 요소의 margin 설정 값이 존재하면.... 초기화하라.
	if ( parseInt($body.css('margin')) > 0 ) {
		$body.css('margin', 0);
	}

	// 동적으로 #page 요소를 만든다. body 요소의 마지막 자식요소로 붙인다.
	var $page = $('<div/>', {
		'id': 'page'
	}).appendTo('body');
	// console.log($page);

	// 브라우저 창의 뷰포트 높이만큼을 #page 요소의 높이로 설정한다.
	var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	// console.log(viewportHeight);
	// var $doc = $('html, body');
	$page.height(viewportHeight);

	// #page 요소에 배경이미지를 설정하고, 배경이미지 크기를 cover로 변경한다. 가운데 배치한다.
	var bgImgPath = 'https://unsplash.imgix.net/photo-1430760814266-9c81759e5e55?dpr=2&fit=crop&fm=jpg&h=750&q=75&w=1050';

	var page_cssMap = {
		'background': 'url('+ bgImgPath +') no-repeat center',
		'background-size': 'cover'
	};

	$page.css(page_cssMap);

	// $('body')
	// 	.addClass('assign-jquery')
	// 	.height(window.innerHeight)
	// 	.attr('data-body', 'root');
});