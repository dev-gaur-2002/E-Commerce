import React, { useEffect,Fragment, useState } from 'react'
import './Home.css'
import Product from '../product/Product' 
import { getAllProducts } from '../../actions/productActions'
import { getProductsDispatcher,getStateFromStore } from '../../store/store'
import {connect , useSelector ,useDispatch} from 'react-redux'
const Home = (props) => {
    // console.log(this)
    // console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProducts(dispatch));
    }, [dispatch]);
    const { loading, error, products } = useSelector((state) => state.products);

    console.log(products)
    // const productState = props.getAllProducts('data')
    // const [productState ,setProductState] = useState({})
    // useEffect(async()=>{ 
    //     await getProductsDispatcher()
    // },[])
    // console.log(getStateFromStore().products)
    // const [productsState,setProductsState] = useState({})
    // const {loading,products,error} = productState
    // console.log("a")
    // console.log(productState)
    // if(!loading){
    //     setProductState(getStateFromStore().products) 
    // }
    // console.log(products)
    return (
    <div>
        {loading ? <div>Page is loading</div> : (
            <Fragment>
            <div className="separator-container">
                <div className="separations">
                    <div className='welcome'>
                        <p>Welcome to the E-Commerce</p>
                    </div>
                    <div className='para'>
                        <p>Find your ideal product here</p>
                    </div>
                    <div className='btn'>
                        <a href="#products"><button>Go To Products</button></a>
                    </div>
                </div>
            </div>
            <div className="product-container">
                <div className="product-heading">
                    <h1>Featured Products</h1>
                </div>
            </div>
            <hr />
            <div className="product-items-container"  id='products'>
            {products.map(product=>{
                    return <Product product={product}/>
            })}
            </div>
        </Fragment>)}
        
    </div>
  )
}
export default Home