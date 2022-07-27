const { default: axios} = require('axios');
const config = require('../util/db_connection');
const sql = require('mssql');

let connection = sql.connect(config);
var request = new sql.Request();

exports.getDrama = async () => {
    var dramas = await (await request.query(`SELECT * FROM Drama`)).recordsets;
    
    var result;
    dramas.forEach((element) => {
        result = element;
    });
    return result;
}

exports.addDrama = async (drama) => {

    console.log(drama.title);
    const result = await request.query(`INSERT INTO Drama (title, country, episodes, duration, genres) VALUES ('${drama.title}','${drama.country}','${drama.episodes}','${drama.duration}','${drama.genres}')`);

    console.log(result);
    return result;
}
