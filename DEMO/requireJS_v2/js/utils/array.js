define(['utils/typeCheck'], function(typeCheck) {

	var nativeForEach = function(list, callback, thiz) {
			[].forEach.call(list, callback, thiz);
		},
		customForEach = function(list, calllback, thiz) {

			var T, k = 0, O, len, kValue;

			if ( typeCheck(list, 'null') ) {
				throw new TypeError('데이터 유형이 Null 또는 Undefined 입니다. 다시 확인해주세요.');
			}

			O = Object(list);
			len = O.length >>> 0;

			if ( !typeCheck(callback, 'function') ) {
				throw new TypeError( callback + ' 전달인자는 함수가 아닙니다.');
			}

			if ( thiz ) {
				T = thiz;
			}

			while (k < len ) {
				if ( k in O ) {
					kValue = O[k];
					calllback.call(T, kValue, O);
				}
				k++;
			}
		};

	return {
		forEach : (function(){
			if ( typeCheck([].forEach, 'function') ) {
				return nativeForEach;
			} else {
				return customForEach;
			}
		})()
	};
});