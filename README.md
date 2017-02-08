# Hibari
Extended user, anime & manga stats for [Kitsu][0]

## Installing
[![GitHub Rl]][1]
[![Github Dl]][1]

- Download the [latest release][1]
- Extract the zip
- Upload to web server

## Development
[![Travis]][2]
[![CC Score]][3]
[![CC Issues]][4]
[![CodeCov]][5]

### Setup
``` bash
# Download source code
git clone https://github.com/wopian/hibari.git
# install dependencies
npm i
```

### Building
```bash
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
```

### Linting
```bash
npm run lint
```

### Updating Local Dependencies
```bash
npm update && npm prune
```

### Updating Origin Dependencies
```bash
npm i -g npm-check-updates
ncu --packageFile package.json
``` 

## Known Issues
No known issues

## Releases
See [CHANGELOG][6]

[GitHub Rl]:https://img.shields.io/github/release/wopian/hibari.svg?style=flat-square
[GitHub Dl]:https://img.shields.io/github/downloads/wopian/hibari/total.svg?style=flat-square
[Travis]:https://img.shields.io/travis/wopian/hibari.svg?style=flat-square&label=travis
[CC Score]:https://img.shields.io/codeclimate/github/wopian/hibari.svg?style=flat-square
[CC Issues]:https://img.shields.io/codeclimate/issues/github/wopian/hibari.svg?style=flat-square
[CodeCov]:https://img.shields.io/codecov/c/github/wopian/hibari.svg?style=flat-square

[0]:https://kitsu.io
[1]:https://github.com/wopian/hibari/releases
[2]:https://travis-ci.org/wopian/Hibari
[3]:https://codeclimate.com/github.com/wopian/hibari
[4]:https://codeclimate.com/github.com/wopian/hibari/Issues
[5]:https://codecov.io/gh/wopian/hibari
[6]:https://github.com/wopian/hibari/blob/master/CHANGELOG.md
