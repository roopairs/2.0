import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():
    email = 'aberard@calpoly.edu'
    password = 'pass4adam'
    data = {'email': email,
            'password': password,
           }
    url = globUrl + 'pm/login/'

    x = requests.post(url, json=data)
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
