[＜ README.md](../../README.md)

-

### [Require.js](http://requirejs.org/)

#### Require.js [다운로드](http://requirejs.org/docs/download.html) | 설치
```sh
$ npm install requirejs
```

#### Require.js 시작하기

```html
<!DOCTYPE html>
<html lang="ko-KR">
	<head>
		<title>Require.js 시작하기</title>
		<script>
			// Require.js 환경설정(Configuration)
			// http://requirejs.org/docs/api.html#config
			var require = {
				// 기본 위치 지정
				baseUrl: 'www/js/'
			};
		</script>
		<!-- data-main 속성에 설정된 JS 파일은 비동기 호출됩니다.
		(※ 파일 경로는 Require.js에 설정된 baseUrl 기준:
		http://requirejs.org/docs/api.html#jsfiles) -->
		<script src="js/libs/require.js" data-main="js/main"></script>
	</head>
	<body>
		...
	</body>
</html>
```

#### main.js - 환경설정 및 모듈 호출 코드

```js
/* 환경설정 */
require.config({
	// 모듈의 단축 경로 지정 또는 이름 별칭(Alias)을 지정
    paths: {
        jquery: 'libs/jquery.min'
    }
});

/* 모듈 호출: jQuery 호출 이후 코드 수행 */
require(['jquery'], function($) {
	// jQuery를 호출한 이후 수행되는 함수 코드
});
```

##### config.js를 별도 관리할 경우

```js
/* config.js */
require.config({
    paths: {
        jquery: 'libs/jquery.min'
    }
});
```

```js
/* main.js */
require(['config'], function() {
	// 모듈 호출
	require(['jquery'], function() {
		// 모듈 호출 이후, 콜백 함수 작성
	});
});
```

#### 모듈 정의

Require.js는 AMD 패턴을 사용(jQuery 또한)합니다. Node.js는 CommonJS.<br>
¶ 함께 읽어보기: [JavaScript 표준을 위한 움직임: CommonJS와 AMD](http://helloworld.naver.com/helloworld/textyle/12864)

```js
/* define('id', [dependencies], module) */
define('jquery.slider',  ['jquery'], function($) {
	// jQuery 플러그인 모듈 제작
	$.fn.slider = function() { ... }
});
```

#### AMD의 근간이 되는 3가지 개념

* `동적 로딩` - UI 초기 구현에 필요한 파일만 먼저 불러오고, 나머지는 필요에 따라 개별 호출한다.
* `의존성 관리` - JS 파일간 의존성 관리를 명시적으로 하여야 한다.
* `모듈화` - 전역 공간을 오염시키지 않아 JS 파일 간 충돌로 인한 오류를 사전에 방지한다.

¶ 참고하여 읽어보기: [RequireJS - AMD의 이해와 개발](http://helloworld.naver.com/helloworld/textyle/591319)

#### Require.js 환경설정
```js
/*
 * require.js 환경설정 객체
 * http://requirejs.org/docs/api.html#config
 */
var require.config = {

    // 기본 위치 지정
    baseUrl: '/js/app',

    // 모듈 단축 경로 지정 또는 이름 별칭(Alias) 지정
    paths: {
        'lib': '../lib' // "/js/lib" 과 동일하다. baseUrl 기준
    },

    // AMD를 지원하지 않는 외부 라이브러리 모듈 사용을 위한 Shim 설정
    shim: {

    	// Modernizr 라이브러리
        'modernizr': {
            exports: 'Modernizr'
        }
    },

    // 모듈 위치 URL 뒤에 덧붙여질 쿼리를 설정한다.
    // 개발 환경에서는 브라우저 캐시를 회피하기 위해 사용할 수 있고,
    // 실제 서비스 환경이라면 ts값을 배포한 시간으로 설정하여 새로 캐시하게 할 수 있다.
    urlArgs : 'ts=' + (new Date()).getTime()
};
```

#### [r.js](http://requirejs.org/docs/optimization.html#download)를 사용하여 최적화하기

기본 사용법
```sh
# 옵션 설정: main, mainCofigFile, out
$ node r.js -o name=main mainConfigFile=js/main.js out=js/build.js
```

빌드 파일 사용법
```js
/* build.config.js */
({
	name                    : "main",
	baseUrl                 : "../www/_/js/develop",
	paths                   : { requireLib: 'libs/require' },
	include                 : ["requireLib"],
	mainConfigFile          : "../www/_/js/develop/main.js",
	out                     : "../www/_/js/app.min.js",
	optimize                : "uglify2", // "none"
	generateSourceMaps      : true,
	preserveLicenseComments : false
})
```

```sh
$ node r.js -o build.cofig.js # build.config.js 파일 옵션을 사용
```

#### r.js를 사용하여 CSS 파일 최적화하기

기본 사용법
```sh
# 옵션 설정: cssIn, out
$ node r.js -o cssIn=css/style.css out=css/style.min.css
```

빌드 파일 사용법
```js
/* build.css.config.js */
({
	cssIn : "../www/_/css/design/style.css",
	out   : "../www/_/css/style.min.css",
	/**
	 * --------------------------------
	 * 사용 가능한 옵션
	 * https://github.com/jrburke/r.js/blob/master/build/example.build.js#L218
	 * --------------------------------
	 * 모두 압축: ""
	 * 라인 유지: "standard.keepLines"
	 * 주석 유지: "standard.keepComments"
	 * 라인/주석 유지: "standard.keepComments.keepLines"
	 * 공백 유지: "standard.keepWhitespace"
	 * --------------------------------
	 */
	optimizeCss: ""
})
```

```sh
$ node r.js -o build.css.cofig.js
```

#### Shell Script 명령 사용하기

```sh
#! /usr/bin/env sh
# chmod +x {directory}

node bin/r.js -o bin/build-css.js
node bin/r.js -o bin/build-js.js
```