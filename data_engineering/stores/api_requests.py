import requests
import json
from dotenv import load_dotenv
import os



# Load variables from .env file
load_dotenv()

email = os.getenv('email')
access = os.getenv('access')
host = os.getenv('host')


# Access the variables
def getToken():
    uri = f"{host}/api/v1/login"

    payload = json.dumps({
    "email": email,
    "password": access
    })

    headers = {
    'Content-Type': 'application/json',
    }


    response = requests.request("POST", uri, headers=headers, data=payload)

    return response.json()['token'], response.json()['user']  if response.status_code ==200 or response.status_code ==201 else 'Error'


def batchWriteStores(body, token):
    uri = f"{host}/api/v1/admin/stores/new"

    payload = json.dumps(body)

    headers = {
    'Content-Type': 'application/json',
    'Cookie': f'token={token}'
    }
    try:
        response = requests.request("POST", uri, headers=headers, data=payload)
        return response.content
    except Exception as e:
        print(f'could not make a batch request: {e}')

def addStores(body, token):
    uri = f"{host}/api/v1/admin/store/new"

    payload = json.dumps(body)

    headers = {
    'Content-Type': 'application/json',
    'Cookie': f'token={token}'
    }
    try:
        response = requests.request("POST", uri, headers=headers, data=payload)

        return response.content
    except  Exception as e:
        print(f'could not make a request: {e}')

# get stores
def getStores(_search_keyword, token):
    
    url = f"{host}/api/v1/stores?keyword={_search_keyword}"

 
    headers = {
    'Content-Type': 'application/json',
    'Cookie': f'token={token}'
    }
    
    try:
        response = requests.request("GET", url, headers=headers)
        return response.json()
    except Exception as e:
        print(e)





