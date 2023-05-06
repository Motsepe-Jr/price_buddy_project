import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';
import { Query } from 'mongoose';
import Category from '../models/category';



//  create new product  => /api/v1/product/new
const newCategory = catchAsyncErrors (async (req, res:Response, next:NextFunction) => {

    // categories are creatred by admin user
    req.body.user = req.user.id

    // body = {name, description, images[url, public_id]}
 
   const category = await Category.create(req.body);

    res.status(201).json({
        success:true, 
        category
    })

})

//  create many categories => /api/v1/products/new
const newCategories = catchAsyncErrors (async (req: Request, res:Response, next:NextFunction) => {

    const categories = await Category.insertMany(req.body); // array of categories

    res.status(201).json({
        success:true, 
        categories
    })

})

// get all products => /api/v1/products
const getCategories = catchAsyncErrors (async (req: Request, res: Response, next: NextFunction) => {

    const resPerPage = 8;
    const categoriescount = await Category.countDocuments();


    const apifeatures = new APIFeatures(Category.find(),  req) // req needed to provided the type 
                             .search()
                             .pagination(resPerPage) 
                             
                          
   
    const categories = await apifeatures.query;

   
    res.status(200).json(
        categories
    )
})

export {newCategories, newCategory, getCategories}

