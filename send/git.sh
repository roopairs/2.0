#!/bin/bash

if [ "$1" == "" ]
then
   echo "You didn't put a message"
else
   git add .
   git commit -m '$1'
   git push
fi
