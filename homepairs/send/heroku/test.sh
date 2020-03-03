#!/bin/bash

git init
heroku git:remote -a homepairs-mytest
git add .
git commit -m 'deploy'
git push --force heroku master
rm -r -f .git
