#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd dist

git init
git config user.name "$GH_USERNAME"
git config user.email "$GH_EMAIL"

git remote add upstream "https://$GH_TOKEN@github.com/wopian/hibari.git"
git fetch upstream
git reset upstream/gh-pages

echo "hb.wopian.me" > CNAME

touch .

git add -A .
git commit -a -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages
