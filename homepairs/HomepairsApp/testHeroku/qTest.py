import json

import requests


################################################################################
# Vars
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():
     tokenSend = "Token " + '34b0348afafbe01042f7af1ba4949a9bbb4d0883'

     data = {'display_name': 'Different Display Name', 'type': 1}

     url = 'https://capstone.api.roopairs.com/v0/service-locations/zKnLDxl/equipment'
 
     x = requests.post(url, json=data, headers={"Authorization": tokenSend})
     # x = requests.get(url, headers={"Authorization": tokenSend})
     print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
