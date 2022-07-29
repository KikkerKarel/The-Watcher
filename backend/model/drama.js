module.exports = class Drama {

    constructor(Id, userId, title, country, episodes, duration, genres, score)
    {
        this.Id = Id;
        this.userId = userId;
        this.title = title;
        this.country = country;
        this.episodes = episodes;
        this.duration = duration;
        this.genres = genres;
        this.score = score;
    }

    display(){
        console.log(this.Id, this.userId, this.title, this.country, this.episodes, this.duration, this.genres, this.score);
    }
}