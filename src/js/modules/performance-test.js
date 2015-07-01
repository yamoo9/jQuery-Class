define(['jquery'], function() {
	'use strict';




	console.time('Non Cached');

		var i = 0;
		for(; i < 10000; i++) {
			var $test = $('div');
		}

	console.timeEnd('Non Cached');




	console.time('Cached');

		var i = 0;
		var $test = $('div');

		for(; i < 10000; i++) {
			var s = $test;
		}

	console.timeEnd('Cached');




});