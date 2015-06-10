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
	// console.log('Modernizr를 통해 Flexbox 신기술 적용 유무 체크: ' + Modernizr.flexbox);
	// console.log('Detectizr: ' + Detectizr);
	// console.log('jQuery 버전: ' + $.fn.jquery);

	var $html = $('html'),
		$body = $('body');

	// <html> 요소를 체크: Modernizr, Detectizr가 수행한 일

	// 사용자의 웹브라우저가 HTML 비디오 지원하나요?
	if ($html.hasClass('video')) {
		console.log('HTML5 Video를 지원해!!');
	} else {
		console.log('HTML5 Video를 지원 안해!!');
	}

	// 사용자는 모바일에서 접근했나요?
	if ($html.hasClass('desktop')) {
		console.log('데스크톱에서 접근했어요');
	} else {
		console.log('모바일에서 접근했어요');
	}

	// jQuery를 활용하 DOM 조작
	$body
		.addClass('using-requirejs')
		.height(window.innerHeight)
		.css({
			'background': '#e45e26',
			'color': '#fff'
		})
		.append('<h1>wow! RequireJS</h1>');
});
