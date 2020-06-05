import requests


################################################################################
# Vars
globUrl = 'https://homepairs-alpha.herokuapp.com/'
globUrl = 'https://homepairs-mytest.herokuapp.com/'
globUrl = 'http://localhost:8000/'


# Everything is correct
def test_basic_connection():

    token = "9bb09119c59766319dba8420d6f20edd7750d2eb787b22792d76d7581b614c77"
    url = globUrl + 'servicerequest/'
    serviceCategory = 'Lighting and Electrical'
    serviceCategory = 'general appliance'
    serviceCategory = 'hvac'
    serviceCategory = 'plumbing'
    serviceType = 'repair'
    serviceDate = '2020-05-05'
    details = 'All the details'
    pocName = 'POC Name'
    poc = '90926177771'
    propId = 'zKnVDKl'
    appId = 'oKB83x9'
    provId = '1'

    data = {
                'serviceCategory':serviceCategory,
                'serviceType':serviceType,
                'serviceDate':serviceDate,
                'details':details,
                'pocName':pocName,
                'poc':poc,
                'propId':propId,
                'appId':appId,
                'provId':provId
           }
    x = requests.post(url, json=data, headers={'token': token})
    print(x.text)


if __name__ == '__main__':
    print("Testing")
    test_basic_connection()
