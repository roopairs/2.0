from django.http import HttpResponse
import requests

def homePageView(request):

    url = "https://capstone.api.roopairs.com/v0/auth/login/"
    data = {
              "username": "lordfarqaad@duloc.com",
              "password": "pass4farquaad"
           }
    response = requests.post(url, json=data)
    return HttpResponse(response.text)
