define(function() {
	'use strict';

	/**
	 * --------------------------------
	 * display: inline 요소를 찾아야...
	 * --------------------------------
	 */

	var display_value = 'inline, block, inline-block, list-item'.split(', '),
		k             = 0,
		l             = display_value.length,
		d_value;

	for (; k<l; k++) {

		d_value = display_value[k];

		if (!$.expr[':'][d_value]) {
			$.expr[':'][d_value] = function(el, index, meta) {
				return $(el).css('display') === d_value;
			}
		}

	}




});