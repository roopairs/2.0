#!/bin/bash

git init
heroku git:remote -a homepairs-alpha
git add .
git commit -m 'deploy'
git push --force heroku master
rm -r -f .git
