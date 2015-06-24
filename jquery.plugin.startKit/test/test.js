require.config({

	baseUrl: '../js',

	paths: {
		'qunit': 'libs/qunit/qunit',
		'jquery': 'libs/jquery.min',
		'yamoo9.jquery.util.test': '../test/yamoo9.jquery.util.test',
	},

	shim: {
		'qunit': {
			exports: 'QUnit'
		},
		'jquery': {
			exports: '$'
		},
		'yamoo9.jquery.util.test': {
			deps: ['qunit', 'jquery']
		}
	},

	waitSeconds: 15,

	urlArgs: 'ts:' + (new Date()).getTime()

});

require(['yamoo9.jquery.util.test'], function() {
	QUnit.start();
});