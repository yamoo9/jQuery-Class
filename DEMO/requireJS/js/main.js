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
	},
	// shim 설정
	shim: {
		'modernizr': {
			exports: 'Modernizr'
		},
		'detectizr': {
			exports: 'Detectizr',
			deps: ['modernizr']
		}
	}
});

// RequireJS 모듈 관리 (의존성관리)
require(['detectizr', 'jquery'], function(Detectizr, $) {
	console.log('Modernizr를 통해 Flexbox 신기술 적용 유무 체크: ' + Modernizr.flexbox);
	console.log('Detectizr: ' + Detectizr);
	console.log('jQuery 버전: ' + $.fn.jquery);
});
