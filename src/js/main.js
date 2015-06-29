require.config({

	baseUrl: 'js',

	paths: {
		'jquery'          : 'libs/jquery.min',
		'jquery.dataLink' : 'plugins/dataLink/jquery.dataLink',
		'jquery.skipNav'  : 'plugins/skipNav/jquery.skipNav',
	},

	shim: {
		'jquery.dataLink': {
			deps    : ['jquery'],
			// exports : '$.fn.dataLink'
		}
	},

	waitSeconds: 20,

	urlArgs : 'ts=' + (new Date()).getTime()

});

require(['init']);