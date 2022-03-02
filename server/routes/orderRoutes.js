const express = require('express')
const {isAuthenticated , isAdmin}= require('../middleware/auth')
const {createOrder, getOrderDetails, getMyOrderDetails, getAllOrders, updateOrder, deleteOrder} = require('../controllers/orderFunctions')

const router = express.Router()

router.route('/order/new').post(isAuthenticated , createOrder)
router.route('/order/me').get(isAuthenticated,getMyOrderDetails)
router.route('/orders/:id').get(isAuthenticated,isAdmin('admin'),getOrderDetails)
router.route('/admin/orders').get(isAuthenticated,isAdmin('admin'),getAllOrders)
router.route('/admin/order/update/:id').put(isAuthenticated,isAdmin("admin"),updateOrder)
router.route('/admin/order/remove').delete(isAuthenticated,isAdmin("admin"),deleteOrder)

module.exports = router