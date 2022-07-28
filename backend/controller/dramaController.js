const Drama = require('../model/drama');
const catchAsync = require('../util/catchAsync');
const IDrama = require('../interface/IDrama');

exports.getDrama = catchAsync(async(req, res, next) => {

    var result = await IDrama.getDrama();

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.addDrama = catchAsync(async(req, res, next) => {

    newDrama = new Drama(req.body.title, req.body.country, req.body.episodes, req.body.duration, req.body.genres);

    var result = await IDrama.addDrama(newDrama);

    res.status(200).send({
        success: true,
        payload: result
    });
});