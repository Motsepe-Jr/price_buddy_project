import os
import glob
import json

path_to_images = "images/"

# Get a list of all the image files in the folder
image_files = glob.glob(os.path.join(path_to_images, "*.*"))



# add a new category and corresponding image to the image folder
categories =   ('Coca Cola',
                'Jacobs Kronung',
                'Nescafe Gold',
                'Tastic Rice', 
                'Sasko',
                'Albany', 
                'White Star Super Maize', 
                'Ace Super Maize',
                'Lucky Star Pilchards',
                'Sunfoil Pure Sunflower', 
                'Koo Baked Beans',
                'Jungle Oats',
                'Mr. Pasta Macaroni Pasta',
                'Domestos',
                'Baby Soft White Toilet Paper',
                'Sunlight Original Dishwashing Liquid',
                'Handy Andy',
                'Omo Auto Laundry Washing Powder',
                'Vanish Stain Remover Laundry Detergent', 
                'Sunlight 2 in 1 Auto Washing Powder',
                'Colgate', 
                'Dettol', 
                'Dove',
                'Milk',
                'Eggs')

search_categories = (
                'Coca Cola',
                'Jacobs Kronung',
                'Nescafe Gold',
                'Tastic Rice', 
                'Sasko',
                'Albany', 
                'White Star Super Maize', 
                'Ace Super Maize',
                'Lucky Star Pilchards',
                'Sunfoil Pure Sunflower', 
                'Koo Baked Beans',
                'Jungle Oats',
                'Mr. Pasta Macaroni Pasta',
                'Domestos',
                'Baby Soft White Toilet Paper',
                'Handy Andy',
                'Omo',
                'Vanish', 
                'Sunlight',
                'Colgate', 
                'Dettol', 
                'Dove',
                'Milk',
                'Eggs'
)
