(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/**
 * --------------------------------
 * CommonJS 방식
 * --------------------------------
 */
// 모듈 호출
var instructor = require('./instructor.js');

console.log(instructor.name);
},{"./instructor.js":1}]},{},[2]);
