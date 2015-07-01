define([
	'jquery.skipNav'
],
function() {
	'use strict';

	// $.skipNav() 사용법
	// skipNav()를 적용할 콘테이너 요소 선택자 전달
	$('#skip-menu').skipNav();





	// 새로운 가상클래스 선택자를 정의
	// $.expr[':'] === jQuery.expr.pseudos
	// jQuery.expr.createPseudo()

	$.expr[':'].absolute = function(el) {
		// return el.style.position === 'absolute';
		return $.$(el).css('position') === 'absolute';
	};

	$('div:eq(0)').css('position', 'absolute');

	var divAbs = $('div:absolute()');

	console.log(divAbs);

});