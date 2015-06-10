/**
 * --------------------------------
 * Main Javascript File
 * RequireJS를 사용해서 모듈을 호출하는 코드
 *
 * define()
 * require()
 * --------------------------------
 */

/**
 * RequireJS 환경설정 객체
 * --------------------------------
 */
require.config({
	// 기준 경로 설정
	baseUrl: 'js/',
	// 별칭(Alias) 설정
	paths: {
		'jquery'    : 'libs/jquery-1.11.3.min',
		'modernizr' : 'libs/modernizr.custom.71961',
		'detectizr' : 'libs/detectizr.min'
	}
});

// RequireJS 모듈 관리 (의존성관리)
require(['modernizr', 'jquery'], function(Modernizr, $) {
	console.log('Modernizr: ' + Modernizr);
	console.log('jQuery 버전: ' + $.fn.jquery);
});
