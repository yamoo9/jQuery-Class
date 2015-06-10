[＜ README.md](../../README.md)

-

### [Browserify](http://browserify.org/)

Browserify는 서버사이드 환경에서 사용되는 CommonJS 형식의 `require('modules')` 코드를 사용하여 의존성 관리를 할 수 있을 뿐만 아니라, 클라이언트 사이드 환경에서도 사용할 수 있도록 한데 묶어주는(Bundle) 유용한 툴입니다. 즉, Node.js와 같은 형식을 웹 브라우저에서도 동일하게 사용할 수 있습니다.

#### Browserify 설치
```sh
$ npm install -g browserify # --global 글로벌 설치
```

#### Browserify 기본 실행 명령
```sh
# 사용법: browserify [파일] {옵션설정}
$ browserify main.js -o build.js # {메인 파일} {빌드 파일} --outfile
```

#### 모듈 호출
```js
var $      = require('jquery'),
	isType = require('./dom-helpers/isType');
```

#### 모듈 정의/출력
```js
'use strict';

// 모듈 정의
var isType = function(data, type) {
	if (
		typeof data === type ||
		typeof data === 'object' && data instanceof Array && type === 'array'
	) { return true; }
	return false;
}

// 모듈 출력
module.exports = isType;
```

---

#### [UMD](https://github.com/umdjs/umd): Universal Module Definition

UMD란? 자바스크립트 모듈을 어떤 환경에서나 사용하기 위한 모듈 패턴을 말합니다.

[CommonJS 형식의 jquery 플러그인](https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js)

---

### [Watchify](https://github.com/substack/watchify)

Browserify 관찰모드(Watch Mode) 모듈

#### Watchify 설치
```sh
$ npm install -g watchify # --global 글로벌 설치
```

#### 기본 사용법

```sh
$ watchify main.js -o build.js
```

#### 옵션 설정

`-v`: Verbose. 번들링(모듈 병합) 시간을 콘솔 화면에 출력하는 옵션

```sh
$ watchify main.js -o build.js -v
```

---

### 온라인 NPM + Browserify 코드 공유 서비스

[requirebin.com](http://requirebin.com/)