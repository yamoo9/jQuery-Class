/**
 * --------------------------------
 * Main Javascript File
 * RequireJS를 사용해서 모듈을 호출하는 코드
 *
 * define()
 * require()
 * --------------------------------
 */

require(['libs/jquery-1.11.3.min'], function($) {
	console.log($ === window.jQuery);
});
