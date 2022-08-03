const Movie = require('../model/movie');
const catchAsync = require('../util/catchAsync');
const IMovie = require('../interface/IMovie');
const User = require('../model/user');

exports.getMovies = catchAsync(async(req, res, next) => {

    var result = await IMovie.getMovies();

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.getMoviesByUserId = catchAsync(async(req, res, next) => {

    const newUser = new User(req.params.userId);

    var result = await IMovie.getMovies(newUser);

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.addMovie = catchAsync(async (req, res, next) => {

    const newUser = new User(req.params.userId);
    const newMovie = new Movie(null, req.body.title, req.body.country, req.body.duration, req.body.genres, req.body.score);

    var result = await IMovie.addMovie(newUser, newMovie);

    res.status(201).send({
        success: true,
        payload: result
    });
})