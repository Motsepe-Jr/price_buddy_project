import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';
import { Query } from 'mongoose';



//  create new product  => /api/v1/product/new
const newProduct = catchAsyncErrors (async (req, res:Response, next:NextFunction) => {

    req.body.user = req.user.id
 
   const product = await Product.create(req.body);

    res.status(201).json({
        success:true, 
        product
    })

})

//  create many products => /api/v1/products/new
const newProducts = catchAsyncErrors (async (req: Request, res:Response, next:NextFunction) => {

    const product = await Product.insertMany(req.body); // array of products

    res.status(201).json({
        success:true, 
        product
    })

})


// get all products => /api/v1/products
const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 6;
  
    // Create an instance of the APIFeatures class with the Product collection and the current request
    const apifeatures = new APIFeatures(Product.find(), req)
      .search()
      .filter()
      .pagination(resPerPage);
  
    // Add pagination to the APIFeatures instance and execute the query
    const products = await apifeatures.query;
  
    // Get the unique store ids from the products array
    const storeIds = [...new Set(products.map(product => product.store))];
    const productIds = [...new Set(products.map(product => product._id))];

    console.log(productIds);
  
    // Populate storeInfo field using $lookup aggregation
    const product_store = await Product.aggregate([
      {
        $match: { store: { $in: storeIds } } // match products by store id
      },
      {
        $match: { _id: { $in: productIds } } // match products by _id
      },
      {
        $lookup: {
          from: "stores",
          localField: "store",
          foreignField: "_id",
          as: "storeInfo",
        },
      },
    ]);
  
    res.status(200).json(
     product_store
);
  });

// get specifc product based on ID =? /api/v1/product/:id
const getSingleProduct =   catchAsyncErrors (async (req: Request, res: Response, next: NextFunction) => {

    const product = await Product.findById(req.params.id);

    
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json(
      product
      )

})

// update Product => /api/v1/product/:id
const updateProduct = catchAsyncErrors (async (req: Request, res: Response, next: NextFunction) => {
    
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    })

    res.status(200).json({
        success: true, 
        product
    })


})

// delete products => aoi/v1/admin/product/:id
const deleteProduct = catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) => {
    
    const  product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    
    await product.deleteOne();

    // remove the image associated with the product

    res.status(200).json({
        success: true,

        message: 'Product deleted successfully'
    })

})




export {getProducts, newProduct, newProducts, getSingleProduct, updateProduct, deleteProduct}