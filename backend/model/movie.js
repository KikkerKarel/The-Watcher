module.exports = class Movie {
    
    constructor(Id, title, country, duration, genres, score)
    {
        this.Id = Id;
        this.title = title;
        this.country = country;
        this.duration = duration;
        this.genres = genres;
        this.score = score;
    }

    display(){
        console.log(this.Id, this.title, this.country, this.duration, this.genres, this.score);
    }
}