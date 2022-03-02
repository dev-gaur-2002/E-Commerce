import {
    ALL_PRODUCT_FAILIURE,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAILIURE,
    SINGLE_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    SINGLE_PRODUCT_SUCCESS,

} from '../constants/constants' 

 
export const productReducer = (state = { products:[] },action) =>{
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return{
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                productCount:action.payload.productCount
            }
        case ALL_PRODUCT_FAILIURE:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }    
        default:
            return state;
    }
}
 
export const productDetailsReducer = (state = {product:{}},action)=>{
    switch(action.type){
        case SINGLE_PRODUCT_REQUEST:
            return{
                loading:true,
                product:{}
            }
        case SINGLE_PRODUCT_SUCCESS:
            return{
               loading:false,
               product:action.payload 
            } 
        case SINGLE_PRODUCT_FAILIURE:
            return{
                loading:true,
                error:action.payload
            }
        default:
            return{
                ...state
            }
    }
}
     
