const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router
    .route('/get/:userId')
    .get(userController.getUserById)

router
    .route('/register')
    .post(userController.register)

router
    .route('/login')
    .post(userController.login)

module.exports = router;