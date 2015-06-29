define(['jquery'], function($) {
	'use strict';

	// $(this);
	// $.$(this);
	$.$ = function(el) {
		if ( !$.data(el, 'this') ) { $.data(el, 'this', $(el)) }
		return $.data(el, 'this');
	};

	// $(this); $(this).index();
	// c = $.$config(this); c.el; c.index;
	$.$config = function(el, meta) {
		return {
			el : $.$(el),
			index : this.el.index(),
			meta : (meta ? meta[3] : null)
		};
	};

});