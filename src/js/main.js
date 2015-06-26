require.config({

	baseUrl: 'js',

	paths: {

	},

	shim: {

	},

	urlArgs : 'ts=' + (new Date()).getTime()
});

require(['init']);