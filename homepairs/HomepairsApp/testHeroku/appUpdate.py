import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():

    token = "b686d8251997061d56a4674d87c2fcfbb10e2487d1dfce105c64c6cb22dee58c"
    url = globUrl + 'appliances/'
    newName = 'My Second Appliance'
    newCategory = 'Plumbing'
    appId = 'oKB83x9'

    data = {
            'appId': appId,
            'newName': newName,
            'newCategory': newCategory,
           }
    x = requests.put(url, json=data, headers={'token': token})
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
