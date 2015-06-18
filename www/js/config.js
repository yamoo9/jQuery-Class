/**
 * --------------------------------
 * requireJS 환경설정(Configuration)
 * --------------------------------
 */
require.config({

	/**
	 * JS 파일의 기본 경로 설정
	 * @type {String}
	 */
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
		'radioClass'       : 'plugins/jquery.radioClass',
		// 모듈
		'init'             : 'modules/init',
		'main'             : 'modules/main',
		'other_main'       : 'modules/other_main',
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

	/**
	 * config.js에서 호출하는 JS 파일 등록
	 * @type {Array}
	 */
	deps: [
		'main',
		// 'init',
		// 'other_main',
		// 'modules/_test',
		// 'plugins/jquery.radioClass',
		// 'modules/checkLibs'
	],

	waitSeconds : 15,

	urlArgs     : 'ts=' + (new Date()).getTime(),

});