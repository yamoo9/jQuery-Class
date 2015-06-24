define(function() {
	'use strict';

	/**
	 * --------------------------------
	 * display: inline 요소를 찾아야...
	 * --------------------------------
	 */

	if (!$.expr[':'].inline) {
		$.expr[':'].inline = function(el, index, meta, items) {
			return $(el).css('display') === 'inline';
		}
	}
	if (!$.expr[':'].block) {
		$.expr[':'].block = function(el, index, meta, items) {
			return $(el).css('display') === 'block';
		}
	}



});