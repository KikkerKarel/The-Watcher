module.exports = class Drama {

    constructor(Id, userId, title, country, episodes, duration, genres)
    {
        this.Id = Id;
        this.userId = userId;
        this.title = title;
        this.country = country;
        this.episodes = episodes;
        this.duration = duration;
        this.genres = genres;
    }

    display(){
        console.log(this.Id, this.userId, this.title, this.country, this.episodes, this.duration, this.genres);
    }
}