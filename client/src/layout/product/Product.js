import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component' 
import './Product.css'


const Product = ({product}) => {
	const options = {
		edit:false,
		color:"#fefbe9",
		activeColor:'red',
		value:product.rating,
		size:20,
		isHalf:true
	}
	return (
    <div>
		<Link className='product-card' to={`/product/${product._id}`}>
				<img src={product.images[0].url}alt={product.name} className='product-img'/>
				<div className="product-details">
					<p className='product-name'>{product.name}</p>
					<div>
						<ReactStars {...options}/> <span className='reviews'>({product.numberOfReviews} reviews)</span>
					</div>
					<span className='price'>${product.price}</span>
				</div>
		</Link>
	</div>
  )
}

export default Product