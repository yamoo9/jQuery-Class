require.config({

	baseUrl: 'js',

	paths: {
		// Library
		'jquery'          : 'libs/jquery.min',
		// Util
		'jquery.utils'    : 'utils/jquery.utils',
		// Plugins
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