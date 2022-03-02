import axios from 'axios'
import {
    ALL_PRODUCT_FAILIURE,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAILIURE,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    CLEAR_ERRORS,

} from '../constants/constants' 



// actions for getting all the products
export const getAllProducts =async (dispatch)=>{

    // waiting for request 
    try {
        
        dispatch({
            type:ALL_PRODUCT_REQUEST,
        })
        //getting data from backend
        const {data} =  await axios.get('http://localhost:5000/api/v1/')
        console.log(data)

        // showing data on frontend
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error)
        return dispatch({
            type:ALL_PRODUCT_FAILIURE,
            payload:error
        })
    }
}


// actions to get the details of a single product
export const productDetailsActions = (productId) =>async (dispatch) =>{
    try {
        dispatch({
            type:SINGLE_PRODUCT_REQUEST,
        })

        const {data} = await axios(`http://localhost:5000/api/v1/product/${productId}`)
        // console.log(data)
        return await dispatch({
            type:SINGLE_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        return dispatch({
            type:SINGLE_PRODUCT_FAILIURE,
            payload:error           
        })
    }
}



export const clearAllErrors  = async(dispatch)=>{ 
    dispatch({
        type:clearAllErrors
    })
}