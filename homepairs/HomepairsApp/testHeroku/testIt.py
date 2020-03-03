import requests
import json



################################################################################
# Vars
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'https://homepairs-alpha.herokuapp.com/'


# Everything is correct
def test_basic_connection():
    email = 'eerongrant@gmail.com'
    password = 'pass4eeron'
    data = {'email': email, 'password': password}
    url = globUrl + 'login/'

    x = requests.post(url, json=data)
    print(x.text)

    #url = globUrl + 'property/abjdkg/'


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
