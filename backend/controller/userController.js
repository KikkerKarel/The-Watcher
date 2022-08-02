const User = require('../model/user');
const catchAsync = require('../util/catchAsync');
const IUser = require('../interface/IUser');
// const Authenticate = require('../model/authenticate');

exports.getUserById = catchAsync(async (req, res, next) => {

    var newUser = new User(req.params.userId);

    var result = await IUser.getUserById(newUser);

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.register = catchAsync(async (req, res, next) => {

    var newUser = new User(null, req.body.username, req.body.password);

    var result = await IUser.register(newUser);

    if (result){
        res.status(201).send({
            success: true,
            payload: "Registered successfully!"
        });
    } else {
        res.status(400).send({
            success: false,
            payload: "Username already exists"
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {

    var newUser = new User(null, req.body.username, req.body.password);

    var result = await IUser.login(newUser);

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.uploadProfilePicture = catchAsync( async(req, res, next) => {

    var newUser = new User(req.params.userId, null, null, req.body.imageUri);

    var result = await IUser.uploadProfilePicture(newUser);

    res.status(200).send({
        success: true,
        payload: result
    });
});

exports.getProfilePicture = catchAsync(async(req, res, next) => {

    var newUser = new User(req.params.userId);

    var result = await IUser.getProfilePicture(newUser);

    res.status(200).send({
        success: true,
        payload: result
    });
});