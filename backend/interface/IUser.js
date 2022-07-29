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

    var check = (await request.query(`SELECT * FROM Profile`)).recordsets[0];
    let result;
    if (check.length > 0) {
        check.forEach(async element => {
            if (element.username !== user.username) {
                await request.query(`INSERT INTO Profile (username, passwordHash) VALUES ('${user.username}', '${passwordHash}')`);
                result = true;
            }
            else {
                result = false;
            }
        });
    }
    await request.query(`INSERT INTO Profile (username, passwordHash) VALUES ('${user.username}', '${passwordHash}')`);

    return result;
}

exports.login = async (user) => {

    const userDetails = (await request.query(`SELECT * FROM Profile WHERE username='${user.username}'`)).recordset[0];
    const result = await bcrypt.compareSync(user.password, userDetails.passwordHash);

    if(result) {
        const token = jwt.sign({"username": user.username}, key.jwtKey, {
            algorithm: "HS256",
            expiresIn: "1d"
        });
        console.log(token);
        return token;
    }
    return "username or password incorrect";

}