import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():
    firstName = 'Jason 5'
    lastName = 'Bourne 14'
    email = 'testingTestingtester@test.com'
    password = 'pass4adam'

    data = {'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password,
           }
    url = globUrl + 'pm/register/'

    x = requests.post(url, json=data)
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
