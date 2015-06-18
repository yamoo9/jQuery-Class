/**
 * --------------------------------------------
 * CommonJS - Server Side Javascript Env.
 * --------------------------------------------
 */

// 모듈 호출
var gulp         = require('gulp'),
	autoprefixer = require('gulp-autoprefixer');

// 호출한 모듈 타입 확인
// console.log(typeof autoprefixer);

// Gulp 모듈 기본 업무 등록
gulp.task('default', ['prefix', 'watch']);

// Gulp 모듈 관찰 업무 등록
gulp.task('watch', function() {
	gulp.watch('src/style.css', ['prefix'])
})

// Gulp 모듈 prefix 업무 등록
gulp.task('prefix', function() {
	var source = gulp.src('src/style.css');
	source
		.pipe( autoprefixer(['last 2 versions']) )
		.pipe( gulp.dest('dist/') );
});