const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router
    .route('/get/:userId')
    .get(userController.getUserById)

router
    .route('/register')
    .get(userController.register)

router
    .route('/login')
    .post(userController.login)

router
    .route('/image/upload/:userId')
    .post(userController.uploadProfilePicture)

router
    .route('/image/get/:userId')
    .get(userController.getProfilePicture)

module.exports = router;