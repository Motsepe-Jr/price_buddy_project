import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';

// Create abd send token in the cookie

const sendToken = (user: Document, statusCode: number, res: Response) => {

    // create JWT token
    const token = user.getJwtToken();

    // options for cookies
    const options = {
        expires: new Date(
            Date.now() +  (process.env.COOKIES_EXPIRES_TIME as unknown as number) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true // cannot be accessed by using JS code
    }

    res.status(statusCode).cookie('token', token, options).json({
        success:true, 
        user, 
        token
    })

}

export {sendToken}