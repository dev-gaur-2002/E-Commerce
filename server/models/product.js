const mongoose = require("mongoose")
const productSchema  = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'please enter the description of the product']
    },
    price:{
        type:Number,
        required:[true,'please enter the price of the product'],
        maxLength:6
    },
    rating:{
        type:Number,
        default:0,

    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'please enter product Category']
    },
    stock:{
        type:Number,
        required:[true,'please enter the stock of the product'],
        maxLength:4
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdBy:  {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})

module.exports = mongoose.model('Product', productSchema)