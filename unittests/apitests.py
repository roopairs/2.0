################################################################################
# File Name : test.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Wed Dec  4 19:25:45 2019
# Description:

################################################################################
# Imports
import requests
import json

################################################################################
# Vars

url = "http://localhost:8000/verticalAPI/"
url = "https://vertical-proto-homepairs.herokuapp.com/verticalAPI/"

################################################################################
if __name__ == '__main__':
   data = {"username": "tommy@gmail.com", "password": "pass4tommy"}
   data = {"username": "dam@gmail.com", "password": "pass4adam"}
   data = {"username": "adam@gmail.com", "password": "pass4adam"}
   x = requests.post(url, json=data)
   print(x.text)

def test_NoRoopairsAccount():
   data = {"username": "adam@gmail.com", "password": "pass4adam"}
   x = requests.post(url, json=data)
   info = json.loads(x.text)
   assert info.get("status") == "success"
