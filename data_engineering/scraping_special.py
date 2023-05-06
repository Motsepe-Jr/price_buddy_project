# REUSE THE CODE TO GET PRODUCTS ON SPECIAL

import time 
 
import pandas as pd 
import json
import re
from selenium import webdriver 
from selenium.webdriver import Chrome 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.common.by import By 
from webdriver_manager.chrome import ChromeDriverManager

import requests
from bs4 import BeautifulSoup

from image_uploader import get_image_url
from categories.api_requests import addProduct
from categories.categories import categories
from category_store_id import get_stores_id, get_category_id, user, token

#========================================WOOLWORTHS================================================================#
def woolworths_data_processing(product_lists, category_name):
	store_name = 'woolworths'
	woolworths_product = []
	for product in product_lists:
		url = product[1]
		product = product[0]
		lines = product.splitlines()
		product_dict = {'images': []}
		for indx, line in enumerate(lines):
			if (indx == 0 or indx == 1) and len(line) >= 4:

				product_dict['name'] = line.strip()

				#  upload image to cloudinary
				try:
					url_cl, options = get_image_url(url, line)
					product_dict['images'].append({'url': url_cl,
				                              'public_id':line})
					product_dict['store'] = get_stores_id(store_name)
					product_dict['category'] = get_category_id(category_name)
					product_dict['user'] = user
				except Exception as e:
					print('could not upload product image')
			
			if line.startswith('R '):
				product_dict['price'] = line.strip()
			if line.startswith('BUY ANY'):
				continue
			if len(line) <= 4:
				continue
		woolworths_product.append(product_dict)

	return woolworths_product


def get_woolworths_data(_search_product):

	category_name = _search_product

	options = webdriver.ChromeOptions() 
	options.headless = True 

	options.page_load_strategy = 'none' 
	
	chrome_path = ChromeDriverManager().install() 
	chrome_service = Service(chrome_path) 
	
	driver = Chrome(options=options, service=chrome_service) 
	driver.implicitly_wait(5)


	url = f"https://www.woolworths.co.za/cat?Ns=p_salesRank|1&Ntt={_search_product}&inv=0&No=0" 
	
	driver.get(url) 
	time.sleep(10)

	product_lists = driver.find_elements(By.CSS_SELECTOR, "div.product-list__item") 


	if product_lists: 
		product_lists = [(attr.text, attr.find_element(By.XPATH, "//div[@class='product--image']/img").get_attribute('src')) for attr in product_lists] 
	else: 
		# set the variable to None if there aren't any dietary attributes found. 
		product_lists = None

	return product_lists, len(product_lists), category_name


#===================================================SHOPRITE=========================================================#

def get_shoprite_data(_search_product):
	store_name = 'shoprite'

	category_name = _search_product

	url = f'https://www.shoprite.co.za/search/all?q={_search_product}'
	response = requests.get(url)
	soup = BeautifulSoup(response.text, 'html.parser')
    

	product_list = soup.find('div', class_='search-landing__block__list col-sm-12 col-md-9')
	product_lists = []
	for product in product_list.find_all('div', class_='product-frame'):


		product_name = product.find('h3', class_='item-product__name').text.strip()
		product_price = product.find('span', class_='now').text.strip()
		product_image_url = product.find('img')['data-original-src']

		url = "https://www.shoprite.co.za" + product_image_url

		try:
			url_cl, options = get_image_url(url, product_name)
		except Exception as e:
			print(f'error could not upload image: {e}')
	
		product_lists.append({
			"name": product_name,
			"price": product_price,
			"images": [{
			"public_id":product_name,
			"url": url_cl
			}],
		   'store' : get_stores_id(store_name),
		   'category' : get_category_id(category_name),
		    'user' : user
		})

	return product_lists


#===================================================PICK n PAY=========================================================#

def get_picknpay_data(_search_product):
	store_name = 'pick n pay'

	category_name = _search_product

	url = f'https://www.pnp.co.za/pnpstorefront/pnp/en/search/?text={_search_product}'
	response = requests.get(url)
	soup = BeautifulSoup(response.content, 'html.parser')
    

	products = soup.find_all('div', {'class': 'productCarouselItemContainer'})
	product_lists = []
	for product in products:

		product_name = product.find('div', {'class': 'item-name'}).text.strip()
		product_price = product.find('div', {'class': 'currentPrice'}).text.strip()
		image_source = product.find('img')['src']


		try:
			url_cl, options = get_image_url(image_source, product_name)
		except Exception as e:
			print(f'error could not upload image: {e}')
	
		product_lists.append({
			"name": product_name,
			"price": product_price,
			"images": [{
			"public_id":product_name,
			"url": url_cl
			}],
		   'store' : get_stores_id(store_name),
		   'category' : get_category_id(category_name),
		    'user' : user
		})

	return product_lists


#===================================================SPAR============================================================#

def get_spar_data(_search_product):
    
	search = 'Sunlight'  if 'Sunlight' in _search_product or 'Vanish' in _search_product else _search_product

	store_name = 'spar'

	category_name = _search_product

	url = f'https://midstream-spar.co.za/?orderby=popularity&paged=1&s={search}&post_type=product&dgwt_wcas=1'
	response = requests.get(url)
	soup = BeautifulSoup(response.content, 'html.parser')
    

	products = soup.find_all('div', {'class': "product-inner clr"})
	product_lists = []
	for product in products:

		product_name =  product.find('h2', class_='woocommerce-loop-product__title').text.strip()
		product_price = product.find('span', class_='price').find('span', class_='woocommerce-Price-amount amount').find('bdi').get_text()
		image_source =  product.find('img', class_='woo-entry-image-main')['src']

		try:
			url_cl, options = get_image_url(image_source, product_name)
		except Exception as e:
			print(f'error could not upload image: {e}')
	
		product_lists.append({
			"name": product_name,
			"price": product_price,
			"images": [{
			"public_id":product_name,
			"url": url_cl
			}],
		   'store' : get_stores_id(store_name),
		   'category' : get_category_id(category_name),
		    'user' : user
		})

	
	return product_lists

#========================================BATCH WRITE TO DATABASE==================================================

for search_name in categories:


	# -----------------shoprite-------------------
	try:
		shoprite_data = get_shoprite_data(search_name)
		response = addProduct(shoprite_data, token)
	except Exception as e:
		print(f'failed to load data with search name:{search_name}')
	

	#----------------pick n pay-----------------
	try:
		pick_pay_data = get_picknpay_data(search_name)
		response = addProduct(pick_pay_data, token)
	except Exception as e:
		print(f'failed to load data with search name:{search_name}')


	# --------------woolies--------------------
	try:
		product_lists, length, category_name = get_woolworths_data(search_name)
		woolies_products = woolworths_data_processing(product_lists, category_name)
		response = addProduct(woolies_products,token)
	except Exception as e:
		print(f'failed to load data with search name:{search_name}')


	#---------------spar-----------------------
	try:
		spar_data = get_spar_data(search_name)
		response = addProduct(spar_data, token)
	except Exception as e:
		print(f'failed to load data with search name:{search_name}')

	time.sleep(30)


	
