define(['jquery'], function($) {
	'use strict';

	if (!$.fn.radioClass) {
		$.fn.radioClass = function(name) {
			this.addClass(name);
			var $siblings = this.siblings();
			$.each($siblings, function(index, item) {
				var $item =  $siblings.eq(index); // $(item);
				if ( $item.hasClass(name) ) {
					$item.removeClass(name);
				}
				// DomScript
				// if (item.classList.contains(name) ) {
				// 	item.classList.remove(name);
				// }
			});

			return this;
		}
	}

});