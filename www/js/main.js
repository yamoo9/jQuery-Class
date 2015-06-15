/**
 * --------------------------------
 * requireJS 환경설정(Configuration)
 * --------------------------------
 */
require.config({
	baseUrl: 'js',
	paths: {
		'jquery'    : 'libs/jquery.min',
		'modernizr' : 'libs/modernizr.min',
		'detectizr' : 'libs/detectizr.min'
	},
	shim: {
		'modernizr': {
			exports: 'Modernizr'
		},
		'detectizr': {
			exports: 'Modernizr.Detectizr',
			deps: ['modernizr']
		}
	}
});

/**
 * 모듈 exports 테스트
 * --------------------------------
 */
// require(['modernizr', 'detectizr'], function(m, d) {
// 	console.log(m, d);
// });

/**
 * 모듈별 호출 코드
 * --------------------------------
 */
require(['detectizr', 'jquery'], function(Detectizr, $) {
	'use strict';

	// jQuery 플러그인: $('body').setHeight100vh();
	console.log( $.prototype === $.fn, $().jquery );

	if( !$.fn.setHeight100vh ) {
		$.fn.setHeight100vh = function() {
			// console.log(this); // jQuery Object
			this.css('height', '100vh');
			return this; // jQuery Object
		}
	}

	if( !$.fn.redify ) {
		$.fn.redify = function() {
			this.css('background', '#FC414B');
			return this;
		}
	}

	// 플러그인 실행 코드
	$('body').setHeight100vh().redify().addClass('body_el');

});





// require(['detectizr', 'jquery'], function(Detectizr, $) {

// 	// requireJS > main.js > modernizr.js > detectizr.js > callback
// 	Detectizr.detect();

// 	// requireJS > main.js > jquery.js > callback
// 	$('body').height('100vh').css({
// 		'background': '#FC414B'
// 	});
// });

// require(['jquery', 'modernizr'], function($, Modernizr) {
// 	console.log($ === window.jQuery, Modernizr);
// });