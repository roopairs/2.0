import requests
import json



################################################################################
# Vars
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():
    email = 'adamberard99@gmail.com'
    propId = 'abcdef'
    data = {'email': email, 'propId': propId}
    url = globUrl + 'tenant/move/'

    x = requests.post(url, json=data)
    print(x.text)

if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
