define([
	'active_detectizr',
	'setHeight100vh',
	'radioClass',
	'redify',
],function() {
	'use strict';

	return function() {

		// 플러그인 실행 코드
		$('body')
			.setHeight100vh()
			// .redify()
			.addClass('body_el');

		$('ul li').on('click', function() {
			$(this).radioClass('selected').redify();
		});

		// $.each(['a', 'k', 'a', 'p'], function(i, k) {
		// 	console.log('i: ', i, '\nk: ', k);
		// });
	};

});