/**
 * --------------------------------
 * require([의존파일리스트], 콜백함수)
 * --------------------------------
 */

/**
 * --------------------------------
 * RequireJS 환경설정
 * --------------------------------
 */
require.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'libs/jquery.min'
	}
});

require([], function() {
	var body = document.body;
	body.classList.add('no-assign-jquery');
	body.style.height = window.innerHeight + 'px';
	body.setAttribute('data-body', 'root');

})

// require(['jquery'], function() {

// 	$('body')
// 		.addClass('assign-jquery')
// 		.height(window.innerHeight)
// 		.attr('data-body', 'root');

// });