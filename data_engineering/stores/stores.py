import os
import glob
import json

path_to_images = "images/"

# Get a list of all the image files in the folder
image_files = glob.glob(os.path.join(path_to_images, "*.*"))



# add a new category and corresponding image to the image folder
stores =   ('pick n pay', 'woolworths', 'spar', 'shoprite')
