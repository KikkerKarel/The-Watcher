const express = require('express');
const movieController = require('../controller/movieController');

const router = express.Router();

router
    .route('/get/all')
    .get(movieController.getMovies)

router
    .route('/add/:userId')
    .post(movieController.addMovie)


module.exports = router;