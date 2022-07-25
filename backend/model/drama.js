module.exports = class Drama {

    constructor(title, country, episodes, duration, genres)
    {
        this.title = title;
        this.country = country;
        this.episodes = episodes;
        this.duration = duration;
        this.genres = genres;
    }

    display(){
        console.log(this.title, this.country, this.episodes, this.duration, this.genres);
    }
}