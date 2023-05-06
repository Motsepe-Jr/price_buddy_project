import express from 'express';

const router = express.Router();


import { authAndAuthorize, isAuthenticatedBearerUser,  } from '../middlewares/auth';

import { getSpecials, newSpecials} 
       from '../controllers/specialController';

// CLIENT ROUTES -----------------------------
router.get('/specials',   getSpecials)


// ADMIN ROUTES ------------------------------
router.post('/admin/specials/new', authAndAuthorize('admin'), newSpecials)


export {router}