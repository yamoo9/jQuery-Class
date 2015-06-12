define(['utils/array'], function(array) {
	var eventObj = {
		addEvent: (function(){
			if (window.addEventListener) {
				return function(el, type, fn) {
					el.addEventListener(type, fn, false);
					return el;
				}
			} else if (window.attachEvent) {
				return function(el, type, fn) {
					el.attachEvent('on'+type, fn);
					return el;
				}
			} else {
				return function(el, type, fn) {
					el['on'+type] = fn;
				}
			}
		})(),
		removeEvent: (function(){
			if (window.removeEventListener) {
				return function(el, type, fn) {
					el.removeEventListener(type, fn, false);
					return el;
				}
			} else if (window.detachEvent) {
				return function(el, type, fn) {
					el.detachEvent('on'+type, fn);
					return el;
				}
			} else {
				return function(el, type, fn) {
					el['on'+type] = null;
				}
			}
		})()
	},

	events = ['click', 'mouseover', 'moseout', 'keypress'];

	array.forEach(events, function(evt) {
		eventObj[evt] = function(el, fn) {
			this.addEvent(el, evt, fn);
		}
	});

	return eventObj;
});