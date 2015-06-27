require.config({

	baseUrl: '../js',

	paths: {
		'qunit'                   : 'libs/qunit/qunit',
		'jquery'                  : 'libs/jquery.min',
		'yamoo9.jquery.util'      : 'plugins/yamoo9.jquery.util',
		'yamoo9.jquery.expr'      : 'plugins/yamoo9.jquery.expr',
		'yamoo9.jquery.util.test' : '../test/yamoo9.jquery.util.test',
		'yamoo9.jquery.expr.test' : '../test/yamoo9.jquery.expr.test',
	},

	shim: {
		'qunit': {
			exports: 'QUnit',
			init: function(QUnit) {
				Qunit.config.autoLoad = false;
				Qunit.config.autoStart = false;
			}
		},

		'jquery': {
			exports: '$'
		},

		'yamoo9.jquery.util': ['jquery'],
		'yamoo9.jquery.expr': ['jquery'],

		'yamoo9.jquery.util.test': {
			deps: [
				'qunit',
				'yamoo9.jquery.util'
			]
		},

		'yamoo9.jquery.expr.test': [
			'qunit',
			'yamoo9.jquery.util',
			'yamoo9.jquery.expr'
		]
	},

	waitSeconds: 15,

	urlArgs: 'ts:' + (new Date()).getTime()

});

require(['yamoo9.jquery.expr.test'], function() {
	QUnit.load();
	QUnit.start();
});