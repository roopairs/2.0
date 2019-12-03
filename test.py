################################################################################
# File Name : test.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Mon Dec  2 19:49:00 2019
# Description:

################################################################################
# Imports
import requests

################################################################################
# Vars
url = "http://localhost:8000/verticalAPI/"
#url = "https://vertical-proto-homepairs.herokuapp.com/verticalAPI"

################################################################################
if __name__ == '__main__':
   data = {"username": "Lord Farquaad",
           "password": "hello world"}
   x = requests.get(url, json=data)
   print(x.text)
