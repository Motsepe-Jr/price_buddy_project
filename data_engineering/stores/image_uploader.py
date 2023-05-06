# import libraries
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv
import cloudinary
import os
import glob
import json



# Load variables from .env file
load_dotenv()

# Access the variables
cloud_name =os.getenv('cloud_name')
api_key = os.getenv('api_key')
api_secret = os.getenv('api_secret')




cloudinary.config(
  cloud_name = cloud_name,
  api_key = api_key,
  api_secret = api_secret,
  secure = True
)


def get_stores_image_url(img_path, image_name):
    try:
          upload(img_path, public_id=image_name)
          url, options = cloudinary_url(image_name, width=100, height=150, crop="fill")
          return url, options
    except Exception as e:
         print(f'Image not uploaded due :{e}')
         return e