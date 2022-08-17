const config = require('../util/db_connection');
const sql = require('mssql');

let connection = sql.connect(config);
var request = new sql.Request();

exports.getDrama = async () => {

    var dramas = (await request.query(`SELECT * FROM Drama`)).recordsets;
    
    return dramas[0];
}

exports.updateDramaById = async (drama, progress) => {

    const result = (await request.query(`UPDATE Drama SET 
    title = '${drama.title}', 
    country = '${drama.country}', 
    episodes = '${drama.episodes}', 
    duration = '${drama.duration}', 
    genres = '${drama.genres}', 
    score = '${drama.score}',
    progress = '${progress.progress}' 
    WHERE Id='${parseInt(drama.Id)}'`));

    console.log(result);

    return result;
}

exports.getDramasByUserId = async (user) => {

    const userId = parseInt(user.userId);
    var dramas = (await request.query(`SELECT * FROM Drama WHERE userId='${userId}'`)).recordsets;
    
    var result;
    dramas.forEach((element) => {
        result = element;
    });
    return result;
}

exports.addDrama = async (user, drama) => {

    const userId = parseInt(user.userId);
    const result = await request.query(`INSERT INTO Drama (userId, title, country, episodes, duration, genres, score, progress) 
    VALUES ('${userId}','${drama.title}','${drama.country}','${drama.episodes}','${drama.duration}','${drama.genres}', '${drama.score}', '0')`);

    return result;
}

exports.updateProgress = async (drama, episode) => {

    const id = parseInt(drama.Id);
    const result = await request.query(`IF NOT EXISTS
    (SELECT progress FROM Drama WHERE Id='${id}')
        INSERT INTO Drama (progress) VALUES ('${episode.progress}')
    ELSE
        UPDATE Drama SET progress = '${episode.progress}' WHERE Id='${id}'`);

    return result;
}
