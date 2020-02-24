import requests
import json



################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'


# Everything is correct
def test_basic_connection():
    #email = 'eerongrant@gmail.com'
    #password = 'pass4eeron'
    #data = {'email': email, 'password': password}
    #url = globUrl + 'login/'

    #x = requests.post(url, json=data)

    url = globUrl + 'property/abjdkg/'
    x = requests.get(url)

    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
