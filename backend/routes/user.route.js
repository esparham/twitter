const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authCheck = require('../middleware/auth.middleware');
const fileUpload = require('../middleware/fileUpload.middleware');

//Signup
router.post('/signup', fileUpload.single('image'), userController.signUp);
//Login
router.post('/login', userController.login);
//Reset Password
router.post('/resetPassword', authCheck, userController.resetPassword);
//Forgot Password
router.post('/forgotPassword', userController.forgotPassword);
router.post('/changePassword/', userController.changePassword);
//
router.post('/userInfo/', authCheck, userController.userInfo);
//Test
router.get('/', authCheck, userController.getAllUsers);

module.exports = router;
