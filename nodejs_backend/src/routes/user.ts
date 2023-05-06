import express from 'express';

const router =  express.Router();

import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile,
     updateUserPassword, updateUserProfile, getAllUsers, updateUser, deleteUser} from '../controllers/userController';

import { authAndAuthorize } from '../middlewares/auth'; 

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token', resetPassword)

router.get('/me', authAndAuthorize('user', 'admin'), getUserProfile)
router.put('/update/password', authAndAuthorize('user'), updateUserPassword)
router.put('/me/update', authAndAuthorize('user'), updateUserProfile)

// admin
router.get('/admin/users', authAndAuthorize('admin'), getAllUsers)
router.put('admin/user/:id', authAndAuthorize('admin'), updateUser)
router.put('admin/user/:id', authAndAuthorize('admin'), deleteUser)


export {router}





