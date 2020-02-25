import requests
import json



################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():
    email = 'eerongrant@gmail.com'
    password = 'pass4eeron'
    data = {'email': email,
            'password': password,
           }
    url = globUrl + 'login/'

    x = requests.post(url, json=data)
    responseData = json.loads(x.text)
    token = responseData.get('token')

    url = globUrl + 'property/vKaJ2kR'
    tokenSend = "Token " + token
    x = requests.get(url, headers={"Authorization": tokenSend})
    print(x.text)



if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
