#!/bin/bash

git init
heroku git:remote -a calm-garden-64456
git add .
git commit -m 'deploy'
git push --force heroku master
rm -r -f .git
