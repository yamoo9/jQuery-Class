## 웹 접근성을 고려한 jQuery 플러그인 제작 과정

- [1일차 내용 요약](DOC/DAY01.md)
- [2일차 내용 요약](DOC/DAY02.md)

---

### 3일차 "RequireJS를 활용한 모듈 정의/호출 복습"

Javascript는 사용하기 편한만큼 편함에 너무 의존하다보면 돌이킬 수 없는 스파게티 코드나 중복 코드 발생이 많아질 수 있어, 모듈 프로그래밍이 필요합니다. RequireJS는 이러한 경우의 한 대안이 될 수 있습니다. RequireJS를 사용하면 모듈 생성/호출 등 관리를 통해 좀 더 체계적인 프로그래밍을 가능하게 해 주며, 브라우저 지원 또한 IE 6 이상 지원합니다.

#### RequireJS에서 모듈 정의/호출에 사용되는 함수

- 모듈 정의 `Module Define`
- 모듈 호출 `Module Require`

```js
// 모듈 정의
define(id, [dependencies], callback);

// 모듈 호출
require([dependencies], callback);
```

#### RequireJS 환경설정
<!-- http://blog.javarouka.me/2013/04/requirejs-javascript.html -->

```js
// 이 코드를 RequireJS가 로딩된 뒤 기타 모듈을 로딩하기 전에 둔다.
require.config({
	// 모듈을 로딩할 기본 패스를 지정한다.
	baseUrl: "/js/some/path",

	// 모듈의 기본 패스를 지정한다
	// 모듈의 이름과 실제 경로를 매핑할 수 있어 별칭(alias) 기능도 할 수 있다
	paths: {
		"module1": "modules/module1", // 이 모듈은 /js/some/path/module/module1.js 경로.

		// 모듈 패스를 배열로 주게 되면 먼저 앞의 URL로 로딩해보고 안되면 다음 경로에서 로딩한다.
		// CDN 등을 사용할 때 좋다.
		"jquery": [
			"https://code.jquery.com/jquery.min",
			"libs/jquery"
		]
	},

	// 모듈의 로딩 시간을 지정한다. 이 시간을 초과하면 Timeout Error 가 throw 된다
	waitSeconds: 15
});
```

#### `r.js`를 활용한 최적화(Optimize)

다음 시간에 다지 정리.

---

#### 테스트를 위한 간단한 웹서버 환경 설정

##### Node.js 모듈 `http-server` 전역 설치 (Global Install)

```sh
$ npm install --global http-server # npm i -g http-server
```

##### `http-server` 사용방법

루트 디렉토리(root directory)로 설정할 폴더에서 아래 명령어를 실행.

```sh
$ http-server -a localhost -p 8888 -o
# 옵션
# --address, -a
# --port, -p
# --open, -o
```