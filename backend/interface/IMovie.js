const config = require('../util/db_connection');
const sql = require('mssql');

var request = new sql.Request();

exports.getMovies = async() => {

    var movies = (await request.query(`SELECT * FROM Movie`)).recordsets;

    return movies[0];
}

exports.addMovie = async(user, movie) => {
    
    const userId = parseInt(user.userId);
    console.log(userId);
    const result = await request.query(`INSERT INTO 
    Movie
    (userId, title, country, duration, genres, score) 
    VALUES 
    ('${userId}', '${movie.title}', '${movie.country}', '${movie.duration}', '${movie.genres}', '${movie.score}')`);

    return result;
}