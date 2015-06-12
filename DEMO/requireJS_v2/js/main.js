require.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'http://code.jquery.com/jquery.min',
		'underscore': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min'
	},
	waitSeconds: 10
});

require(['DOM/event', 'jquery', 'underscore'], function(evt, $, _) {

	var body = document.body;

	body.style.height = window.innerHeight+'px';

	evt.click(body, function() {
		this.style.backgroundColor = 'red';
	});

});