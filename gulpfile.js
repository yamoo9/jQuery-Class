var gulp  = require('gulp'),
	rjs   = require('gulp-requirejs');

var DIR = 'src';

gulp.task('rjs:build', function() {
	rjs({
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
	})
	.pipe(gulp.dest(DIR + '/js/build/'));
});