import {} from '../constants/constants'
import {createStore , combineReducers, applyMiddleware } from 'redux'
import {productDetailsReducer, productReducer} from '../reducers/productReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {getAllProducts ,productDetailsActions} from '../actions/productActions'
import { useState } from 'react'

// const initialState = {}
const allReducers = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer
})


export const store = createStore(allReducers ,composeWithDevTools(applyMiddleware(thunk)) )

// export const getStateFromStore = () =>{
//     return store.getState()
// }

// // const [stateVal,setStateVal]  = useState({})
// export const getProductsDispatcher = async ()=>{
//     await store.dispatch(getAllProducts)
//     // setStateVal(getStateFromStore().products)
// } 



// export const getProductDetails = (id)=>{
//     return store.dispatch(productDetailsActions(id))
// }
