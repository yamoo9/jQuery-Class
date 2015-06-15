({
	// r.js 설정 API
	// https://github.com/jrburke/r.js/blob/master/build/example.build.js

    name                    : "main",
	// build/ 디렉토리 기준 설정
    baseUrl                 : "../js/",
    // build된 JS 파일 출력 설정
    out                     : "../js/build/build.min.js",
    // main.js 파일 위치 설정
    mainConfigFile          : "../js/main.js",
    // 삽입할 라이브러리 설정
    include                 : ["requireLib"],
    // 경로 설정
    paths                   : { requireLib: 'libs/require.min' },
    // 최적화 설정
    optimize                : "uglify2", // "none", "uglify2", "uglify"
    // 소스맵 생성 설정
    generateSourceMaps      : true,
    // 저작권 주석 보존 설정
    preserveLicenseComments : false
})