import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():

    token = "5fb597d97f8b4f7414a9f61bf83693fe26643599a624d6fa0645116a003afce7"
    propId = "oKB3Qk9"
    url = globUrl + 'property/' + propId + '/'

    x = requests.get(url, headers={'token': token})
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()