const express = require('express');
const dramaController = require('../controller/dramaController');

const router = express.Router();

router
    .route('/get')
    .get(dramaController.getDrama);

router
    .route('/get/dramaId/:id')
    .get(dramaController.getDramaById);

router
    .route('/get/:userId')
    .get(dramaController.getDramasByUserId);

router
    .route('/add')
    .post(dramaController.addDrama);


module.exports = router;