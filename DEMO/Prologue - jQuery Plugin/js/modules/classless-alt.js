// A군
// ---------------------------------------------
(function(global, $){
	'use strict';

	var name = 'demoClass';
	$('.demo').addClass(name);

})(window, window.jQuery);

// C양
// ---------------------------------------------
(function(global, $){
	'use strict';

	var name = 'innerClass';
	$('.demo').find('.inner').addClass(name);

})(window, window.jQuery);

// P이사
// ---------------------------------------------
(function(global, $){
	'use strict';

	var name = 'bodyClass';
	$('body').addClass(name);

})(window, window.jQuery);