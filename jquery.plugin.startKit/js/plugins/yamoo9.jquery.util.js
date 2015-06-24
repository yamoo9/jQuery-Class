define(['jquery'], function($) {
	'use strict';

	if (!$.version) {
		$.version = $().jquery;
	}

	if (!$.log) {
		$.log = function(arg) {
			if (window.console) {
				console.log(arg);
			}
		};
	}

})