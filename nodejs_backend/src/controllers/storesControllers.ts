import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';
import { Query } from 'mongoose';
import Stores from '../models/store';



//  create new product  => /api/v1/product/new
const newStore = catchAsyncErrors (async (req, res:Response, next:NextFunction) => {

    // stores are creatred by admin user
    req.body.user = req.user.id

    // body = {name, description, images[url, public_id]}
 
   const store = await Stores.create(req.body);

    res.status(201).json({
        success:true, 
        store
    })

})

//  create many stores => /api/v1/products/new
const newStores = catchAsyncErrors (async (req: Request, res:Response, next:NextFunction) => {

    const stores = await Stores.insertMany(req.body); // array of stores

    res.status(201).json({
        success:true, 
        stores
    })

})

// get all products => /api/v1/products
const getStores = catchAsyncErrors (async (req: Request, res: Response, next: NextFunction) => {

    const resPerPage = 4;
    const storescount = await Stores.countDocuments();


    const apifeatures = new APIFeatures(Stores.find(),  req) // req needed to provided the type 
                             .search()
                          
   
    const stores = await apifeatures.query;

   
    res.status(200).json({
        success: true,
        storescount,
        count: stores.length, // filter products
        stores
    })
})

export {newStore, newStores, getStores}
