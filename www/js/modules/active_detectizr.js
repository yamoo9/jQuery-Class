require(['detectizr'], function(D) {
	'use strict';
	/**
	 * config.js 에서 require.config() 설정 내부에 shim 처리하여
	 * 내부에서는 별도의 전달인자로 받아 처리 가능.
	 */
	D.detect();
});