define(['jquery'], function($) {
	'use strict';
	if( !$.fn.redify ) {
		$.fn.redify = function() {
			this.css('background', '#FC414B');
			return this;
		}
	}
});