
from stores.api_requests import getStores, getToken 
from categories.api_requests import getCategory

token, user =  getToken()

def get_stores_id(store_name):
	stores = getStores(store_name, token)
	if stores['success'] == True:
		store_id =  stores['stores'][0]['_id']
		return store_id
	else:
		print('could not find store')
		raise ValueError
	
def get_category_id(category_name):
	categories = getCategory(category_name, token)
	if categories['success'] == True:
		category_id = categories['categories'][0]['_id']
		return category_id
	else:
		print('could not find category')
		raise ValueError
