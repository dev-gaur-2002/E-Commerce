const productModel = require('../models/product')
const ErrorHandler = require('../utils/errorhandler')
const asyncWrapper = require('../utils/asyncWrapper')
const ApiFeatures = require('../utils/apiFeatures')




// create new product --> ADMIN
const createProduct = asyncWrapper(async (req,res)=>{

    req.body.createdBy = req.user.id;

    const item = await productModel.create(req.body)
    res.status(201).json({
        success:true,
        item
    })
})

// get  all proucts
const getAllProducts = asyncWrapper(async (req,res)=>{

    const query = req.query
    const number_of_elements = 6
    const productCount = await productModel.countDocuments() // for forntend purpose

    const apiFeature = new ApiFeatures(productModel.find(),query).search(req).filter(req).pagination(req,number_of_elements)
    
    const products = await apiFeature.query;

    if(products.length === 0){
        return res.status(500).json({
            msg:"no product found"
        })
    }

    res.status(200).json({
        success:true,
        products,
        productCount
    })
})

// update a given product

const updateProduct = asyncWrapper(async (req,res,next)=>{
    const product = await productModel.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('product not found',404))
    }
    const updatedProduct  = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })

    res.status(200).json({
        success:true,
        updatedProduct
    })
})

// get single product
const getOneProduct = asyncWrapper(async (req,res,next)=>{
    const item = await productModel.findById(req.params.id)
    // console.log(item) 
    if(!item){
        return next(new ErrorHandler('product does not exists',404))
    }

    res.status(200).json({
        success:true,
        product:item
    })
})

// delete a product
const deleteProduct = asyncWrapper(async (req,res)=>{
    const item = await productModel.findById(req.params.id)
    if(!item){
        return res.status(500).josn({
            success:false,
            msg:"no succh product found having this id"
        }) 
    }
    const deletedItem  = await productModel.deleteOne({_id:req.params.id})
    res.status(200).json({
        success:true,
        mas:"product deleted successfully",
        deletedElements: deletedItem.deletedCount
    })

} )

// create reviews 

const createReview = asyncWrapper(async(req,res,next)=>{
    const {rating,comment,productId} = req.body

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating,
        comment
    }

    const product = await productModel.findById(productId)
    const isReviewed = product.reviews.find(rev=> rev.user.toString() === req.user._id.toString())
    console.log(isReviewed)

    if(isReviewed !== undefined){
        return next(new ErrorHandler("You have already submitted a review",400)) 
    }
    else{
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }
    
    // getting average of ratingss
    let sum = 0;
    for(let i=0;i<product.reviews.length;i++){
        sum += product.reviews[i].rating
    }
    
    // console.log(sum)
    product.rating = sum/product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        review: review
    })
})

// get all reviews of a product 

const getAllReviews = asyncWrapper(async(req,res,next)=>{
    const productId = req.query.productId
    // console.log(productId)
    const product = await productModel.findById(productId)

    if(!product){
        return next(new ErrorHandler(`Product with id:${productId} does not exists`))
    }

    const reviews = []

    product.reviews.forEach(rev=>{
        reviews.push(rev)
    })

    res.status(200).json({
        success:true,
        reviews
    })
})

// delete a review 

const deleteReview = asyncWrapper(async(req,res,next)=>{
    const product = await productModel.findById(req.query.productId)
    
    const reviews = product.reviews.filter( (rev) => rev.user.toString() !== req.query.id.toString() )

    console.log(reviews)

    let sum = 0;
    let rating;
    if(reviews.length > 1){
        reviews.forEach(element => {
            sum += element.rating; 
        })
        rating  = sum/reviews.length
    }
    else{
        rating = 0;
    }


    console.log(rating)

    const numberOfReviews = reviews.length

    await productModel.findByIdAndUpdate(req.query.productId , {
        reviews,
        rating,
        numberOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })

})

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getAllReviews,
    deleteReview
}