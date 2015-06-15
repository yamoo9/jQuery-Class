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
		'jquery'               : 'libs/jquery.min',
		'isJquery'             : 'modules/isJquery',
		'isJqueryVersion'      : 'modules/isJqueryVersion',
		'assignBgImageforPage' : 'modules/assignBgImageforPage'
	}
});

/**
 * DOMScript Code
 * 별도의 모듈 호출 X
 * --------------------------------
 */
// require([], function() {
// 	var body = document.body;
// 	body.classList.add('no-assign-jquery');
// 	body.style.height = window.innerHeight + 'px';
// 	body.setAttribute('data-body', 'root');
// });



/**
 * jQuery 활용 Code
 * 모듈 호출
 * --------------------------------
 */
require([
	'isJquery',            // 함수 반환
	'isJqueryVersion',     // jQuery 버전 반환
	'assignBgImageforPage' // #page 요소 생성 및 조작 수행
],
function(
	isJquery,
	isJqueryVersion
) {
	console.log(isJquery(), isJqueryVersion);
});