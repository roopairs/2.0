import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'http://localhost:8000/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'


# Everything is correct
def test_basic_connection():
    firstName = 'Jason 2'
    lastName = 'Bourne 2'
    email = 'adamberard99@gmail.com'
    password = 'pass4adam'
    streetAddress = '6601 Owens Drive'
    city = 'Pleasanton'

    data = {'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password,
            'streetAddress': streetAddress,
            'city': city
           }
    url = globUrl + 'tenant/register/'

    x = requests.post(url, json=data)
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
