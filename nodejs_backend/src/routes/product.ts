import express from 'express';

const router = express.Router();


import { authAndAuthorize, isAuthenticatedBearerUser,  } from '../middlewares/auth';

import { getProducts, newProduct, newProducts, 
         getSingleProduct, updateProduct, deleteProduct } 
       from '../controllers/productControllers';

// CLIENT ROUTES -----------------------------
router.get('/products',   getProducts)
router.get('/product/:id', getSingleProduct)

// ADMIN ROUTES ------------------------------
router.post('/admin/product/new', authAndAuthorize('user'), newProduct)
router.post('/admin/products/new', authAndAuthorize('admin'), newProducts)
router.put('/admin/product/:id', authAndAuthorize('admin'),  updateProduct)
router.delete('/admin/product/:id', authAndAuthorize('admin'), deleteProduct)

export {router}

