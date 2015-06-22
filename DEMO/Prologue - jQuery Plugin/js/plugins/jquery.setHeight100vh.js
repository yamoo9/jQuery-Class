define(['jquery'], function($) {
	'use strict';
	if( !$.fn.setHeight100vh ) {
		$.fn.setHeight100vh = function() {
			// console.log(this); // jQuery Object
			this.css('height', '100vh');
			return this; // jQuery Object
		}
	}
});