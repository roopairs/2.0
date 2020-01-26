#!/bin/bash
cd ..

git push heroku 'git subtree split --prefix HomePairsApp master':master --force
