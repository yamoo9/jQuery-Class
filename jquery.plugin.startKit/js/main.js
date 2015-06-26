require.config({

	baseUrl: 'js',

	paths: {
		'jquery'             : 'libs/jquery.min',
		'yamoo9.jquery.util' : 'plugins/yamoo9.jquery.util',
		'yamoo9.jquery.expr' : 'plugins/yamoo9.jquery.expr',
	},

	shim: {
		'jquery': {
			exports: '$'
		},
		'yamoo9.jquery.util': {
			deps: ['jquery']
		},
		'yamoo9.jquery.expr': {
			deps: ['jquery', 'yamoo9.jquery.util']
		},
	},

	waitSeconds: 15,

	urlArgs: 'ts:' + (new Date()).getTime()

});

require(['yamoo9.jquery.expr'], function() {
	$.log($.version);
});