const express = require('express')
const {getAllProducts , createProduct, updateProduct, deleteProduct, getOneProduct, createReview, getAllReviews, deleteReview} = require('../controllers/productFunctions')
const {isAuthenticated , isAdmin}= require('../middleware/auth')
const router = express.Router()

// routes for product

router.route('/').get( getAllProducts )
router.route('/product/create').post( isAuthenticated  , isAdmin("admin") , createProduct)
router.route('/product/:id').patch(isAuthenticated , isAdmin("admin")  ,updateProduct).delete(isAuthenticated  , isAdmin("admin")  ,deleteProduct).get(getOneProduct)
router.route('/review').post(isAuthenticated , createReview)
router.route('/reviews').get(getAllReviews).delete(isAuthenticated , deleteReview)


module.exports = router