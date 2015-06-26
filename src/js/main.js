require.config({

	baseUrl: 'js',

	paths: {
		'jquery': 'libs/jquery.min'
	},

	shim: {

	},

	urlArgs : 'ts=' + (new Date()).getTime()
});

require(['init']);