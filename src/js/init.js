define('init', [
	'jquery',
	'jquery.dataLink'
],
function($) {
	'use strict';
	// console.log('코드 초기화', $ === jQuery);
	$('a').dataLink().on('click', function(e) {
		e.preventDefault();
		alert(e.target.getAttribute('href'));
	});
});