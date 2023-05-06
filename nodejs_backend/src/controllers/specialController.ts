import { Request, Response, NextFunction } from 'express';
import Special from '../models/special';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';
import { Query } from 'mongoose';




//  create many specials => /api/v1/products/new
const newSpecials = catchAsyncErrors (async (req: Request, res:Response, next:NextFunction) => {

    const special = await Special.insertMany(req.body); 

    console.log(special)

    res.status(201).json({
        success:true, 
        special
    })

})

// get all specials
const getSpecials= catchAsyncErrors (async (req: Request, res: Response, next: NextFunction) => {



    const apifeatures = new APIFeatures(Special.find(),  req) // req needed to provided the type 
                             .search()
                          
   
    const specials = await apifeatures.query;

   
    res.status(200).json({
        success: true,
        specials 
        
    })
})


export {newSpecials, getSpecials}