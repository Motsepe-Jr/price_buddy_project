import os
import glob
import json
import time

from categories import  image_files, categories
from image_uploader import get_category_image_url
from api_requests import batchWriteCategories, getToken, addCategory

token, user = getToken()


_categories_payload = []

for image_file in image_files:
     filename = os.path.splitext(os.path.basename(image_file))[0]

     public_key = filename if filename in  categories else print('image path not found in the categories', filename) # 0(1)
     
     try:
          url, options = get_category_image_url(image_file, public_key)

          if not url or not public_key or public_key =='':
               print(filename, url, public_key)
               continue

          _categories_payload.append({
               
          "name": filename,
          "images": [{
               "public_id": public_key,
               "url": url,}]
          })
          time.sleep(5)
     except Exception as e:
          print(f'Failed to uploade image to cloudinary: {e}')

          

if len(_categories_payload) == 1:
     print('adding a category...')
     response = addCategory(_categories_payload[0], token)
    
else:
     print('batch processin started...')
     response = batchWriteCategories(_categories_payload, token)
   








