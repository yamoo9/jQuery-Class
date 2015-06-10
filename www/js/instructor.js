/**
 * --------------------------------
 * 모듈 정의
 * --------------------------------
 */
var instructor = {
	name: 'Jee Hoon',
	nickname: 'yamoo9',
	getFullName: function() {
		return name;
	}
};

// 모듈 출력
module.exports = instructor;

// (function(global){
// 	var instructor = {
// 		name: 'Jee Hoon',
// 		nickname: 'yamoo9',
// 		getFullName: function() {
// 			return name;
// 		}
// 	}

// 	global.instructor = instructor;
// })(window);