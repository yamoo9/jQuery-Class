/**
 * --------------------------------
 * MODULES
 * --------------------------------
 */
var gulp       = require('gulp'),
	rjs        = require('gulp-requirejs'),
	concatCss  = require('gulp-concat-css'),
	prefixer   = require('gulp-autoprefixer'),
	csso       = require('gulp-csso'),
	sourcemaps = require('gulp-sourcemaps');

/**
 * --------------------------------
 * CONFIG
 * --------------------------------
 */
var DIR = 'src/',
	OUT = 'dist/',
	BID = 'build/',

	requireJSOpts = {
		name                    : 'main',
		// build/ 디렉토리 기준 설정
		baseUrl                 : DIR + '/js',
		// main.js 파일 위치 설정
		mainConfigFile          : DIR + "/js/main.js",
		// build된 JS 파일 출력 설정
		out                     : 'main.min.js',
		// 삽입할 라이브러리 설정
		include                 : ["requireLib"],
		// 경로 설정
		paths                   : { requireLib: 'libs/require.min' },
		// 최적화 설정
		optimize                : "uglify2", // "none", "uglify2", "uglify"
		// 소스맵 생성 설정
		generateSourceMaps      : true,
		// 저작권 주석 보존 설정
		preserveLicenseComments : false,
		// require.js: shim 옵션 설정
		shim    : {}
	};


/**
 * --------------------------------
 * DEFAULT / WATCH / BUILD
 * --------------------------------
 */
gulp.task('default', ['css']);

gulp.task('watch', function() {
	gulp.watch( DIR + 'css/**/*.css', ['css'] );
});

gulp.task('build', ['build:css', 'build:rjs']);


/**
 * --------------------------------
 * TASK
 * --------------------------------
 */
// CSS 병합
gulp.task('css', function() {
	gulp.src( [DIR + 'css/style.css', '!' + DIR + 'css/out/*.css'] )
		.pipe( concatCss('all.css') )
		.pipe( prefixer() )
		.pipe( gulp.dest( DIR + 'css/out' ) );
});

// CSS 압축
gulp.task('build:css', function() {
	gulp.src( DIR + 'css/out/*.css' )
		.pipe( csso() )
		.pipe( gulp.dest(DIR + BID) );
});

// [AMD] r.js 최적화
gulp.task('build:rjs', function() {
	rjs( requireJSOpts )
	.pipe(gulp.dest(DIR + BID));
});