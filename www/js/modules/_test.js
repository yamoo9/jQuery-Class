require(['modernizr', 'detectizr'], function(m, d) {
	'use strict';

	/**
	 * config.js 에서 require.config() 설정 내부에 shim 처리하여
	 * 내부에서는 별도의 전달인자로 받아 처리 가능.
	 */
	console.log('Modernizr: ', m, '\nDetectizr: ', d);
});



require(['detectizr', 'jquery'], function(Detectizr, $) {
	'use strict';

	console.log('$ === window.jQuery: ', $ === window.jQuery);
	console.log('$.prototype === $.fn: ', $.prototype === $.fn, '\njQuery Version: ', $.fn.jquery );

});



define(function(require) {
	'use strict';

	// 첫번째 전달인자를 require로 받은 후,
	// CommonJS 방식으로 활용
	// http://requirejs.org/docs/errors.html#notloaded
	var $ = require('jquery');
	// 플러그인 호출
	require('redify');

	$('<div id="page"></div>').appendTo('body').redify();

});