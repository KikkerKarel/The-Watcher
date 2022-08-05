module.exports = class Progress {
    
    constructor(progress) {
        this.progress = progress;
    }

    display() {
        console.log(this.progress);
    }
}