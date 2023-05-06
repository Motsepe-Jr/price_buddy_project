import express from 'express';

const router = express.Router();


import { authAndAuthorize, isAuthenticatedBearerUser,  } from '../middlewares/auth';

import { newCategories, newCategory, getCategories  } from '../controllers/categoriesController';

// CLIENT ROUTES -----------------------------
router.get('/categories',  authAndAuthorize('admin', 'user'), getCategories)


// ADMIN ROUTES ------------------------------
router.post('/admin/category/new', authAndAuthorize('admin'), newCategory)
router.post('/admin/categories/new', authAndAuthorize('admin'), newCategories)


export {router}