#!/bin/bash

git init
git add .
git commit -m 'deploy'
heroku git:remote -a homepairs-alpha
git push --force heroku master

