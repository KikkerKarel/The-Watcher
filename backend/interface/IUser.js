const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../util/key.json');

var request = new sql.Request();

exports.getUserById = async (user) => {
    var result = (await request.query(`SELECT * FROM Profile WHERE Id=${user.userId}`)).recordset;

    return result[0];
}

exports.register = async (user) => {

    const salt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(user.password, salt);

    var response = (await request.query(`SELECT * FROM Profile`)).recordsets[0];

    let result;
    const check = !!response.find(x => { return x.username === user.username});
    if (!check) {
        await request.query(`INSERT INTO Profile (username, passwordHash) VALUES ('${user.username}', '${passwordHash}')`);
        result = true;
    } else {
        result = false;
    }

    return result;
}

exports.login = async (user) => {

    const userDetails = (await request.query(`SELECT * FROM Profile WHERE username='${user.username}'`)).recordset[0];
    const response = await bcrypt.compareSync(user.password, userDetails.passwordHash);

    var result = [];
    if(response) {
        const token = jwt.sign({"username": user.username}, key.jwtKey, {
            algorithm: "HS256",
            expiresIn: "1d"
        });
        console.log(token);
        result.push({token: token, userId: userDetails.Id, username: userDetails.username});
        return result[0];
    }
    return "username or password incorrect";
}

exports.uploadProfilePicture = async (user) => {

    const result = await request.query(`IF NOT EXISTS
    (SELECT profilePicture FROM Profile WHERE Id='${parseInt(user.userId)}')
        INSERT INTO Profile (profilePicture) VALUES ('${user.image}')
    ELSE
        UPDATE Profile SET profilePicture = '${user.image}' WHERE Id='${parseInt(user.userId)}'`);

    return result
}

exports.getProfilePicture = async (user) => {

    const result = (await request.query(`SELECT profilePicture FROM Profile WHERE Id='${parseInt(user.userId)}'`)).recordset;

    return result[0];
}

exports.updateUsername = async (user) => {

    const userId = parseInt(user.userId);

    const response = (await request.query(`SELECT username FROM Profile`)).recordset;

    let result;
    const check = !!response.find(x => { return x.username === user.username });
    if (!check) {
        await request.query(`UPDATE Profile SET username='${user.username}' WHERE Id='${userId}'`);
        result = "success!";
    } else {
        result = "failed";
    }

    return result;
}

exports.updatePassword = async (user) => {

    const userId = parseInt(user.userId);

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(user.password, salt);

    let result;
    await request.query(`UPDATE Profile SET passwordHash='${passwordHash}' WHERE Id='${userId}'`).then(() => {
        result = "Successfully updated!";
    }).catch(err => {
        result = err;
    });

    return result;
}