class Player {
    constructor(possibleAnswers) {
        this.possibleAnswers = possibleAnswers
        this.correctAnswers = 0
        this._score = 0
        this._status = 'Playing'
        this._gameOver = false
    }
    get score() {
        return `${this._score}%`
    }
    set gameOver(value) {
        this._gameOver = value
    }
    get status() {
        return this._status
    }
    updateScore() {
        let correctSlides = document.querySelectorAll('.correct');
        this.correctAnswers = correctSlides.length;
        this._score = (this.correctAnswers/this.possibleAnswers)*100
        let playerNumber = document.querySelector('.score')
        playerNumber.innerHTML = this.score
    }
    updateStatus() {
        if (this._score === 100) {
            this._status = 'Winner'
        } else if (this._score !== 100 && this._gameOver) {
            this._status = "Game Over"
        } else {
            this._status = "Playing"
        }
    }
}