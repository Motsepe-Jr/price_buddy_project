import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import crypto from 'crypto';

declare module 'mongoose' {
  interface Document {

    getJwtToken(): string;
    comparePassword(enteredPassword: string): Promise<boolean>;
    getResetPasswordToken(): number;
  }
}

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name must be less than 30 characters']
    },

    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validator: [validator.isEmail, 'Please enter a valid email address']
    },

    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be at least 6 characters'],
        select: false,
    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },

    role: {
        type: String,
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// encrypting user passqword befire saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password
userSchema.methods.comparePassword = async function(enteredPassword:string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//  Return JWT token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({
        id: this._id,
        email:this.email,
       },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_TIME 
        }
)}





// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // encrypt this token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expires time
    this.resetPasswordExpire = Date.now() + 20 * 60 * 1000


    return resetToken;

}






export default mongoose.model('User', userSchema);