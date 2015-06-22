[＜ README.md](../../README.md)

-

## jQuery Custom Builder
- [jQuery Builder Online](http://projects.jga.me/jquery-builder/)
- [jQuery Builder GitHub](https://github.com/jgallen23/jquery-builder)

```sh
# 모듈 글로벌 설치
$ npm i -g jquery-builder

# 사용법
$ jquery-builder -e ajax,deprecated -m > jquery.min.js

# 옵션 확인
$ jquery-builder --help
```

### 옵션

```
jQuery Builder 0.7.0
Usage: jquery-builder

Options:
  -e, --exclude   Modules to exclude [module,module]  [string]
  -m, --minify    Minify output                       [boolean]
  -l, --ls        List available modules              [boolean]
  -v, --version   Version of jQuery                   [string]  [default: "1.9.1"]
  -s, --versions  List available versions
```

### 제거 가능한 jQuery 모듈 리스트
- ajax
- css
- deprecated
- dimensions
- effects
- event-alias
- offset
- wrap