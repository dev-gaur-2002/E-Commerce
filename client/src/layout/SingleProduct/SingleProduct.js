import React, { useEffect, useState } from 'react'
import './SingleProduct.css'
import {useDispatch,useSelector} from 'react-redux'
import {productDetailsActions} from '../../actions/productActions'
import Review from './Review'
import { useParams} from 'react-router-dom'
// import { getProductDetails } from '../../store/store'
import axios from 'axios'

const SingleProduct = () => {
	
	// const stockEl = document.getElementById("stockVal")
	// console.log(stockEl)
	let { id } = useParams();
	// console.log(id)
	const dispatch = useDispatch()
	// const {product} = useSelector(state=>state.productDetails)
	// console.log("a")
	// useEffect(()=>{
	// 	// getProductDetails(id)
	// 	// console.log('b')
	// },[dispatch,id])
	// console.log("product")
	// console.log(product)
	// let count = Object.keys(product).length;
	// console.log(count)

		return (
			<div className='top'>
				{/* <div className="container">
					<div className="flex-left">
						<img src={product.product.images[0].url} alt="" />
					</div>
					<div className="flex-right">
						<div className="product-info">
							<div className="name">
								{product.product.name}
							</div>
							<div className="id">
								{id}
							</div>
							<hr />
							<div className="price">
								${product.product.price}
							</div>
							<div className="numberOfItems">
								Avaialable items  --  {product.product.stock}
							</div>
							<div className="stockStatus">
								<span>Status</span>
								<span id='stockVal'>In Stock</span>
							</div>
							<div className="description">
								<h3>Description</h3>
								<p>{product.product.description}</p>
							</div>	
							<div className="submit">
								<button>Submit Review</button>
							</div>
						</div>
					</div>
				</div>
				<div className="review-container">
					{product.product.reviews.map((review)=>{
						return <Review name ={review.name} rating = {review.rating} comment = {review.comment}/>
					})}
				</div> */}
			</div>
		)
}

export default SingleProduct