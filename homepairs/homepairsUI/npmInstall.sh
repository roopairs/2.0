#!/bin/bash

#run this whenever you switch branches

cd node_modules/@expo/webpack-config
npm i --prod webpack@4.39.0
cd ../../..
npm install --prod
