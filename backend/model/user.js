module.exports = class User {
    
    constructor(userId, username, password) {
        this.userId = userId; 
        this.username = username;
        this.password = password;
    }

    display() {
        console.log(this.userId, this.username, this.password);
    }
}