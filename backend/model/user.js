module.exports = class User {
    
    constructor(userId, username, password, image) {
        this.userId = userId; 
        this.username = username;
        this.password = password;
        this.image = image;
    }

    display() {
        console.log(this.userId, this.username, this.password, this.image);
    }
}