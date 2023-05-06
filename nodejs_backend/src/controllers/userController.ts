import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import User from '../models/user';
import ErrorHandler from '../utils/errorHandler';
import { Document } from 'mongoose';
import { sendToken } from '../utils/jwtToken';
import { error } from 'console';
import sendEmail from '.././utils/sendEmail';
import crypto from 'crypto';


//  Register the user => api/v1/register
const registerUser = catchAsyncErrors( async(req: Request, 
    res: Response, next: NextFunction) => {

        const {name, email, password} = req.body;

        const user = await User.create({
            name, 
            email, 
            password,

            // change based on what the user upload
            avatar: {

                public_id: 'cld-sample',
                url: 'https://res.cloudinary.com/dygwgwbrj/image/upload/v1682202588/cld-sample.jpg'

            }
        })

       sendToken(user, 200, res)

})

// login user => /api/v1/login

const loginUser = catchAsyncErrors( async(req: Request, 
    res: Response, next: NextFunction) => {

        const {email, password} = req.body;

        // check if the email and password enter by user
        if (!email || !password) {
            return next(new ErrorHandler("Please enter your email and password", 400))
        }

        // find user email in database
        const user = await User.findOne({ email: email }).select("+password")

       if(!user) {
        return next(new ErrorHandler("Invalid email or password.", 401))
       }


      // Check if password given by users is correct or not
      const isPasswordMatched  = await user.comparePassword(password)


      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
      }

      sendToken(user, 201, res)

})

// Reset Password => /api/v1/password/reset/:token
const resetPassword = catchAsyncErrors(async (req: Request,  res: Response, next: NextFunction) => {

    // Post request: the user provide us with their information

    //  hash URL token 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')


    //  compare the hashed token with our database token
    const user = await User.findOne({
        resetPasswordToken,
        // TODO
        // resetPasswordExpires: {$gt:Date.now()} // investigate this, looks like the server date is getting used.
    })


    if (!user) {
        return next(new ErrorHandler("Token is invalid or has been expired", 400))
    }

    if(req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // set up new password
    user.password = req.body.password

    // since we gave the user new password, let remove their temp token for reconvery pass
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    // svae the user
    await user.save()

    // send jwt token
    sendToken(user, 201, res)

})


//forgotPassword => api/v1/password/forgot
const forgotPassword = catchAsyncErrors( async(req: Request,  res: Response, next: NextFunction) => {

    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404))
      }

    //   get token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    // create reset password url
    const resetUrl = `http://${req.get('host')}/api/v1/password/reset/${resetToken}`;


    const message = `Your password reset token is as follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore`

    try {

        await sendEmail({
            email: user.email,
            subject: `PriceComparison: Your password reset token is as follow`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Password recovery send to your email`
        })


    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500))
    }
})

// logOut User => /api/v1/logout
const logoutUser = catchAsyncErrors( async(req: Request,  res: Response, next: NextFunction) => {

       res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
       })
       
       res.status(200).json({
        success: true,
        message: 'Logged out'
       })

})

// get logged in user details =? /api/v1/me
const getUserProfile = catchAsyncErrors( async (req: Request,  res: Response, next: NextFunction) => {


    const user_id = req.user

    const user = await User.findById(user_id);

    if (!user) {
        return next(new ErrorHandler("User not found or Please login again", 404))
      }


    res.status(200).json([
        user
    ])



})

// update user profil => /api/v1/password/update
const updateUserPassword = catchAsyncErrors( async (req: Request,  res: Response, next: NextFunction) => {

    const user_id = req.user

    const user = await User.findById(user_id).select("+password");
    
    if (!user) {
        return next(new ErrorHandler("User not found or Please login again", 404))
      }


    // check prev user password
    const isMatched = await user.comparePassword(
        req.body.oldPassword
    )

    if (!isMatched) {
        return next(new ErrorHandler("old password do not match", 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)

})

// update user profile => /api/v1/me/update
const updateUserProfile =  catchAsyncErrors( async (req: Request,  res: Response, next: NextFunction)  => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // update avatar later
    const user = await User.findByIdAndUpdate(req.user, newUserData, {
        new: true,
        runValidators: true,
    })

    if (!user) {
        return next(new ErrorHandler("User not found or Please login again", 404))
      }

    res.status(200).json({
        success: true,
        message: "Your infromation has been updated successfully"
    })
}
)


// Admin Routes 

// get all users ==> /api/v1/admin/users
const getAllUsers = catchAsyncErrors( async (req: Request,  res: Response, next: NextFunction)  => {
    const users = await User.find();

    if (!users) {
        return next(new ErrorHandler("Users not found or Please ensure you have rights to access this infromation", 404))
      }


    res.status(200).json({
        success: true,
        users
    })
})

// update and delete users

const updateUser =  catchAsyncErrors( async (req: Request,  res: Response, next: NextFunction)  => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    // update avatar later
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    if (!user) {
        return next(new ErrorHandler("User not found or Please login again", 404))
      }

    res.status(200).json({
        success: true,
        message: "user infromation has been updated successfully"
    })
}
)

// delete user 

const deleteUser =  catchAsyncErrors( async (req: Request,  res: Response, next: NextFunction)  => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
      }

    // remove the avatar of the user from cloudinary: TODO
    
    res.status(200).json({
        success: true,
        user
    })
})


export {registerUser, loginUser, logoutUser, forgotPassword, resetPassword,
     getUserProfile, updateUserPassword, updateUserProfile, getAllUsers,
     updateUser, deleteUser}