################################################################################
# File Name : test.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Mon Dec  2 20:36:03 2019
# Description:

################################################################################
# Imports
import requests

################################################################################
# Vars
url = "http://localhost:8000/verticalAPI/"
#url = "https://vertical-proto-homepairs.herokuapp.com/verticalAPI/"

################################################################################
if __name__ == '__main__':
   data = {"username": "1tommy@gmail.com",
           "password": "password"}
   x = requests.post(url, json=data)
   print(x.text)
