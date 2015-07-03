define([
	'jquery.skipNav'
],
function() {
	'use strict';

	// $.skipNav() 사용법
	// skipNav()를 적용할 콘테이너 요소 선택자 전달
	var $skipMenu = $('#skip-menu').skipNav({
		setHash: !false,
		setContainerFocuing: false,
	});


	// 새로운 가상클래스 선택자를 정의
	// $.expr[':'] === jQuery.expr.pseudos
	// jQuery.expr.createPseudo()

	// $.expr[':'].absolute = function(el) {
	// 	// return el.style.position === 'absolute';
	// 	return $.$(el).css('position') === 'absolute';
	// };

	// $.expr[':'].absolute = $.expr.createPseudo(function(meta){
	// 	console.log(meta);
	// 	return function(el) {
	// 		return meta ?
	// 			$.$(el).css('position') === 'absolute' && el.innerText.indexOf(meta) > -1 :
	// 			$.$(el).css('position') === 'absolute';
	// 	}
	// });

	// for ( var i=0, l=20; i<l; i++) {
	// 	$('<div>', {
	// 		'id' : 'new-' + i,
	// 		'text': 'new divistion' + i
	// 	}).appendTo('body');
	// }

	// var $newDivs = $('div[id^="new-"]:nth-group(4)');

	// console.log( $newDivs );

	// $('div:eq(0)').css('position', 'absolute');

	// var divAbs = $('div:absolute(hi)');

	// console.log(divAbs);





});