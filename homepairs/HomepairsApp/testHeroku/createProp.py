import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():

    token = "94c67afefd667f356d4bb89561c0b4c71badd54de20aeacac81054f34ad1f782"
    url = globUrl + 'property/'
    longAddress = '138 Prospect St Berlin, NH'
    numBed = 3
    numBath = 4
    maxTenants = 5

    data = {
            'longAddress': longAddress,
            'numBed': numBed,
            'numBath': numBath,
            'maxTenants': maxTenants
           }
    x = requests.post(url, json=data, headers={'token': token})
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
