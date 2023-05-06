import express from 'express';

const router = express.Router();


import { authAndAuthorize, isAuthenticatedBearerUser,  } from '../middlewares/auth';

import {newStore, newStores, getStores} from '../controllers/storesControllers';

// CLIENT ROUTES -----------------------------
router.get('/stores',  authAndAuthorize('admin', 'user'), getStores)


// ADMIN ROUTES ------------------------------
router.post('/admin/store/new', authAndAuthorize('admin'), newStore)
router.post('/admin/stores/new', authAndAuthorize('admin'), newStores)


export {router}