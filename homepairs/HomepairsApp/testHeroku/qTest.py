import json

import requests


################################################################################
# Vars
globUrl = 'https://capstone.api.roopairs.com/v0/'
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'http://localhost:8000/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'


# Everything is correct
def test_basic_connection():
     tokenSend = "Token " + '34b0348afafbe01042f7af1ba4949a9bbb4d0883'

     url = globUrl + 'servicerequest/Y10BAke'
 
     x = requests.get(url)
     print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
