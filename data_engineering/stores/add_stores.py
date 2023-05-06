import os
import glob
import json
import time

from stores import  image_files, stores
from image_uploader import get_stores_image_url
from api_requests import addStores, getToken, batchWriteStores

token, user = getToken()


_stores_payload = []

for image_file in image_files:
     filename = os.path.splitext(os.path.basename(image_file))[0]

     public_key = filename if filename in  stores else print('image path not found in the store', filename) # 0(1)
     
     try:
          url, options = get_stores_image_url(image_file, public_key)

          if not url or not public_key or public_key =='':
               print(filename, url, public_key)
               continue

          _stores_payload.append({
               
          "name": filename,
          "logo": [{
               "public_id": public_key,
               "url": url,}]
          })
          time.sleep(5)
     except Exception as e:
          print(f'Failed to uploade image to cloudinary: {e}')

          


print(_stores_payload)
if len(_stores_payload) == 1:
     print('adding a store...')
     response = addStores(_stores_payload[0], token)
else:
     print('batch processing started...')
     response = batchWriteStores(_stores_payload, token)








