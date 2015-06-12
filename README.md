## 웹 접근성을 고려한 jQuery 플러그인 제작 과정

- [1일차 내용 요약](DOC/DAY01.md)
- [2일차 내용 요약](DOC/DAY02.md)

---

### 3일차

- [AMD] Require.js vs [CommonJS] Browserify 정리
	- DAY03 브런치 파일 첫번째 공유

- Node.js 모듈 `http-server` 전역 설치 (Global Install)
```sh
$ npm install --global http-server # npm i -g http-server
```

### AMD 방식의 함수들

```js
// 모듈 정의
define(id, [dependencies], callback);
// 모듈 호출
require([dependencies], callback);
```

