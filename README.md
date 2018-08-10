# Hibari

[![web badge]][web]
[![web uptime badge]][web]
[![api uptime badge]][api]
[![commit badge]][commit]
[![contributors badge]][contributors]
[![donate badge]][donate]

A work in progress [Vue] alternative for [Kitsu] users.

**Note:** [new.hibari.moe][web] is currently not in a functional state, only the old [hibari.moe][web-old] is.

## Features

- Login to your Kitsu account

## Browser Support

| ![chrome]</br>Chrome | ![firefox]</br>Firefox | ![safari]</br>Safari | ![edge]</br>Edge
| -------------------- | ---------------------- | -------------------- | ----------------
| 61 and newer         | 55 and newer           |  10.1 and newer      | 15 and newer

[chrome]:https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png
[firefox]:https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png
[safari]:https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png
[edge]:https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png

## Contributing

PRs are welcome :tada:

Check out [CONTRIBUTING] for information on localisation and code standards

## Development

[![travis badge]][travis]
[![appveyor badge]][appveyor]
[![cc coverage badge]][cc coverage]
[![cc maintainability badge]][cc maintainability]
[![david badge]][david]
[![david dev badge]][david dev]

### Requirements

- [git] `>= 2.0.0`
- [node] `>= 8.0.0`
- [yarn] `>= 1.0.0`

### Setup

1. `git clone -b new git@github.com:wopian/hibari.git`
2. `cd hibari`
3. `git checkout -b myFeature` Create a new branch for your feature/bugfix
4. `yarn install` Install dependencies

### Commands

- `yarn dev` Build & run a local dev server
- `yarn lint` Check code conforms to code style

## Releases

See [CHANGELOG]

## License

All code released under the [MIT] license

[Vue]:https://vuejs.org
[Kitsu]:https://kitsu.io
[git]:https://git-scm.com
[node]:https://nodejs.org
[yarn]:https://yarnpkg.com

[CONTRIBUTING]:CONTRIBUTING.md
[CHANGELOG]:CHANGELOG.md
[MIT]:LICENSE.md

[web-old]:https://hibari.moe
[web]:https://new.hibari.moe
[web badge]:https://flat.badgen.net/uptime-robot/status/m779133970-964c0fa9a021aea415919bee
[web uptime badge]:https://flat.badgen.net/uptime-robot/month/m779133970-964c0fa9a021aea415919bee

[api]:https://kitsu.docs.apiary.io
[api uptime badge]:https://flat.badgen.net/uptime-robot/month/m779715870-4bca0187af2c0d280737166a?label=api%20uptime

[commit]:https://github.com/wopian/hibari/commits/new
[commit badge]:https://img.shields.io/github/last-commit/wopian/hibari/new.svg?style=flat-square

[david]:https://david-dm.org/wopian/hibari
[david badge]:https://flat.badgen.net/david/dep/wopian/hibari

[david dev]:https://david-dm.org/wopian/hibari?type=dev
[david dev badge]:https://flat.badgen.net/david/dev/wopian/hibari

[travis]:https://travis-ci.org/wopian/hibari
[travis badge]:https://flat.badgen.net/travis/wopian/hibari/new

[appveyor]:https://ci.appveyor.com/project/wopian/hibari
[appveyor badge]:https://flat.badgen.net/appveyor/ci/wopian/hibari/new

[cc coverage]:https://codeclimate.com/github/wopian/hibari/coverage
[cc coverage badge]:https://img.shields.io/codeclimate/coverage/github/wopian/hibari.svg?style=flat-square

[cc maintainability]:https://codeclimate.com/github/wopian/hibari
[cc maintainability badge]:https://img.shields.io/codeclimate/maintainability/wopian/hibari.svg?style=flat-square

[contributors]:https://github.com/wopian/hibari/graphs/contributors
[contributors badge]:https://img.shields.io/github/contributors/wopian/hibari.svg?style=flat-square

[donate]:https://paypal.me/wopian
[donate badge]:https://flat.badgen.net/badge/support%20me%20on/paypal.me/pink
