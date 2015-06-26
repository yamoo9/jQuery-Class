/*! jquery.generate-dataLink-0.1.0.js © yamoo9.net, 2015 */
define([
	// 의존 모듈
],
function() {
	'use strict';
	// console.log('사용 중인 jQuery 버전은?\n', $().jquery);

	/**
	 * --------------------------------
	 * jQuery 플러그인 디자인 패턴
	 * 이름 정의
	 * 플러그인 유무 확인
	 * 플러그인 작성
	 * 플러그인 내부 this 참조 확인
	 * 플러그인 체이닝 설정
	 * --------------------------------
	 */
	if ( !$.fn.dataLink ) {
		$.fn.dataLink = function() {

			var self = this.filter('[class*="slide-btn-"]'); // $() 인스턴스

			// 체이닝
			// return self;
			return $.each(self, function(index, item) {

				var $item = self.eq(index);

				// console.log($(item).attr('href'));
				// console.log($item.attr('href'));
				// console.log(item.getAttribute('href').split('http://')[1]);

				var link_path = $item.attr('href'),
					link      = link_path.replace('http://', '');

				// console.log($item.text());

				if (link_path.indexOf('http://') > -1) {
					$item.attr('rel', 'external');
				}

				$item
					.attr({
						'data-link' : link,
						'role'      : 'button'
					});
			});
		};
	}
});