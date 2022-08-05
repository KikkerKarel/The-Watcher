const Drama = require('../model/drama');
const catchAsync = require('../util/catchAsync');
const IDrama = require('../interface/IDrama');
const User = require('../model/user');
const Progress = require('../model/progress');

exports.getDrama = catchAsync(async(req, res, next) => {

    var result = await IDrama.getDrama();

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.updateDramaById = catchAsync(async(req, res, next) => {
    
    const newDrama = new Drama(req.params.id, req.body.title, req.body.country, req.body.episodes, req.body.duration, req.body.genres, req.body.score);

    var result = await IDrama.updateDramaById(newDrama);

    res.status(200).send({
        success: true,
        payload: result
    });
})

exports.getDramasByUserId = catchAsync(async(req, res, next) => {

    const newUser = new User(req.params.userId);

    var result = await IDrama.getDramasByUserId(newUser);

    res.status(200).send({
        success: true,
        payload: result
    });
})

exports.addDrama = catchAsync(async(req, res, next) => {

    const newUser = new User(req.params.userId);
    const newDrama = new Drama(null, req.body.title, req.body.country, req.body.episodes, req.body.duration, req.body.genres, req.body.score);

    var result = await IDrama.addDrama(newUser, newDrama);

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.updateProgress = catchAsync(async(req, res, next) => {

    const newDrama = new Drama(req.params.id);
    const newProgress = new Progress(req.body.progress);

    var result = await IDrama.updateProgress(newDrama, newProgress);

    res.status(200).send({
        success: true,
        payload: result
    });
})