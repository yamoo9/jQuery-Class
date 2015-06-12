define(function() {
	var typeCheck = function(data, type) {
		var D = ({}).toString.call(data);
		switch(type) {
			case 'number':
				if (D === '[object Number]') { return true; }
			break;
			case 'string':
				if (D === '[object String]') { return true; }
			break;
			case 'boolean':
				if (D === '[object Boolean]') { return true; }
			break;
			case 'array':
				if (D === '[object Array]') { return true; }
			break;
			case 'function':
				if (D === '[object Function]') { return true; }
			break;
			case 'object':
				if (D === '[object Object]') { return true; }
			break;
			case 'null':
				if (D === '[object Null]') { return true; }
			break;
			case 'undefined':
				if (D === '[object Undefined]') { return true; }
			break;
			default:
				return false;
		}
	};
	return typeCheck;
});