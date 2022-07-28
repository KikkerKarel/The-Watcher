const express = require('express');
const dramaController = require('../controller/dramaController');

const router = express.Router();

router
    .route('/get')
    .get(dramaController.getDrama)

router
    .route('/add')
    .post(dramaController.addDrama)


module.exports = router;