import React from 'react'
import ReactStars from 'react-rating-stars-component' 
import './Reviews.css'

const Review = (props) => {
  const options = {
		edit:false,
		color:"yellow",
		activeColor:'red',
		value:props.rating,
		size:20,
		isHalf:true
	}
  return (
    <div>
        <div className="card">
          <div className="avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="review-name">
            {props.name}
          </div>
          <div className="stars">
          <ReactStars {...options}/>
          </div>
          <div className="comment">
            <p>{props.comment}</p>
          </div>
        </div>
    </div>
  )
}

export default Review