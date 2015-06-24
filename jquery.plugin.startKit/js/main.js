require.config({

	baseUrl: 'js',

	paths: {
		'qunit': 'libs/qunit/qunit',
		'jquery': 'libs/jquery.min',
	},

	shim: {
		'qunit': {
			exports: 'QUnit'
		},
		'jquery': {
			exports: '$'
		}
	},

	waitSeconds: 15,

	urlArgs: 'ts:' + (new Date()).getSeconds()

});

require(['qunit', 'jquery'], function(QUnit, $) {
	// console.log(!!QUnit.module, $().jquery);
})