################################################################################
# File Name : getTommyAccount.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Mon Dec  2 22:09:46 2019
# Description:

################################################################################
# Imports
import requests

################################################################################
# Vars
url = "https://capstone.api.roopairs.com/v0/auth/register/"
data = {
        "first_name": "Thomas",
        "last_name": "Bergmann",
        "email": "tommy@gmail.com",
        "password": "pass4tommy",
        "internal_client": {
                            "name": "Berger Houses",
                            "industry_type": 1
                           }
       }


################################################################################
# Functions

if __name__ == '__main__':
    response = requests.post(url, json=data)
    print(response.text)

