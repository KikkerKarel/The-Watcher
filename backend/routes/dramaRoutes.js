const express = require('express');
const dramaController = require('../controller/dramaController');

const router = express.Router();

router
    .route('/get')
    .get(dramaController.getDrama);

router
    .route('/update/:id')
    .put(dramaController.updateDramaById);

router
    .route('/get/:userId')
    .get(dramaController.getDramasByUserId);

router
    .route('/add/:userId')
    .post(dramaController.addDrama);


module.exports = router;