import json

import requests


def postRooAPI(url, data):
    print("HERE 6")
    response = requests.post(url, json=data)
    print("HERE 7:")
    print(response.text)
    return json.loads(response.text)


def getRooTokenAPI(url, token):
    tokenSend = "Token " + token
    response = requests.get(url, headers={"Authorization": tokenSend})
    return response.json()


def postRooTokenAPI(url, data, token):
    tokenSend = "Token " + token
    response = requests.post(url, json=data, headers={"Authorization": tokenSend})
    return json.loads(response.text)


def putRooTokenAPI(url, data, token):
    tokenSend = "Token " + token
    response = requests.put(url, json=data, headers={"Authorization": tokenSend})
    return json.loads(response.text)
