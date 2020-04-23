import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'http://localhost:8000/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'


# Everything is correct
def test_basic_connection():
    firstName = 'Cesar'
    lastName = 'Chacon'
    email = 'cesar@gmail.com'
    password = 'pass2'
    data = {'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password}
    url = globUrl + 'pm/register/'

    x = requests.post(url, json=data)
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
