const orderModel = require('../models/order')
const ErrorHandler = require('../utils/errorhandler')
const asyncWrapper = require('../utils/asyncWrapper')
const productModel = require('../models/product')
const userModel = require('../models/user')
const order = require('../models/order')



const createOrder = asyncWrapper(async(req,res,next)=>{
    
    const {
            shippingInfo,
            orderItems,
            paymentInfo,
            productPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body

    paymentInfo.paidAt = Date.now()
    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo:paymentInfo,
        productPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user : req.user._id,
    })
    
    res.status(201).json({
        success:true,
        order
    })
})

// get all orders
const getAllOrders = asyncWrapper(async(req,res,next)=>{
    const orders = await orderModel.find({})

    let totalAmount = 0;
     order.forEach(element => {
        totalAmount += element.totalPrice
     });
    
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})

// get order details of logged in user
const getOrderDetails = asyncWrapper(async (req,res,next)=>{
    const order = await orderModel.findById(req.params.id).populate('user' , 'name Email')

    if(!order){
        return next(new ErrorHandler(` order with id:${req.params.id} is not present`))
    }

    res.status(200).json({
        success:true,
        order
    })

})
// get order details of logged in user
const getMyOrderDetails = asyncWrapper(async (req,res,next)=>{
    const orders = await orderModel.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })
})

// update order status


// updateStock function

async function updateStock(productId,quantity){
    const product = await productModel.findById(productId)

    product.stock -= quantity
    await product.save({validateBeforeSave:false})
}


const updateOrder = asyncWrapper(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler(`order with id:${req.params.id} does not exists`))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler(`the order has already been delivered`,400))
    }

    order.orderItems.forEach( async (orderEl) => {
        await updateStock(orderEl.product , orderEl.quantity)
    });

    order.orderStatus = req.body.status

    if(order.orderStatus === 'Delivered'){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        order,
    })
})

// delete order 

const deleteOrder = asyncWrapper(async (req,res,next)=>{
    const order = await orderModel.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`order with id:${req.params.id} is not present ----> invalid id`,400))
    }

    await order.remove()

    res.status(200).json({
        success:true,
        message:'order deleted successfully'
    })
})

module.exports = {
    createOrder,
    getAllOrders,
    getOrderDetails,
    getMyOrderDetails,
    updateOrder,
    deleteOrder
}