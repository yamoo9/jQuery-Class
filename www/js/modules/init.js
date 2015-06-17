define([
	'active_detectizr',
	'redify',
	'setHeight100vh'
],function() {
	'use strict';

	return function() {
		// 플러그인 실행 코드
		$('body')
			.setHeight100vh()
			.redify()
			.addClass('body_el');
	};

});