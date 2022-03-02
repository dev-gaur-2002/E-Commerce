const express = require('express')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changePassword, updateUser, getAllUsers, getSingleUser, updateUserByAdmin, deleteUser } = require('../controllers/userFunctions')
const { isAuthenticated, isAdmin } = require('../middleware/auth')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/reset').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get( isAuthenticated ,getUserDetails)
router.route('/password/change').put( isAuthenticated ,changePassword)
router.route('/me/change').put(isAuthenticated , updateUser)
router.route('/admin/users').get(isAuthenticated , isAdmin("admin") , getAllUsers)
router.route('/admin/users/:id').get(isAuthenticated , isAdmin("admin") ,getSingleUser).put(isAuthenticated , isAdmin("admin") , updateUserByAdmin).delete(isAuthenticated , isAdmin("admin") , deleteUser)



module.exports = router