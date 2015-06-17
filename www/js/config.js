/**
 * --------------------------------
 * requireJS 환경설정(Configuration)
 * --------------------------------
 */
require.config({

	baseUrl: 'js',

	/**
	 * 모듈 경로 별칭 설정
	 * @type {Object}
	 */
	paths: {
		// 라이브러리
		'jquery'           : 'libs/jquery.min',
		'modernizr'        : 'libs/modernizr.min',
		'detectizr'        : 'libs/detectizr.min',
		// 플러그인
		'redify'           : 'plugins/jquery.redify',
		'setHeight100vh'   : 'plugins/jquery.setHeight100vh',
		// 모듈
		'main'             : 'modules/main',
		'init'             : 'modules/init',
		'active_detectizr' : 'modules/active_detectizr',
	},

	/**
	 * AMD를 지원하지 않는 JS 라이브러리 AMD 호환 설정
	 * @type {Object}
	 */
	shim: {
		'jquery': '$',
		'modernizr': {
			exports: 'Modernizr'
		},
		'detectizr': {
			exports: 'Modernizr.Detectizr',
			deps: ['modernizr']
		}
	},

	deps: [
		'main',
		'modules/_test',
	],
	waitSeconds : 15,
	urlArgs     : 'ts=' + (new Date()).getTime(),

});