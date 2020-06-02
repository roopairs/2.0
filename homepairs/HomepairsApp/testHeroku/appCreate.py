import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():

    token = "a3687fff5dc9939a74983e62abe6148658213e282ee4ca5f49d6e47b46f06e87"
    url = globUrl + 'appliances/'
    name = 'My First Appliance'
    category = 'Plumbing'
    location = 'The back corner.'
    propId = 'zKnVDKl'

    data = {
            'name': name,
            'category': category,
            'location': location,
            'propId': propId
           }
    x = requests.post(url, json=data, headers={'token': token})
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
