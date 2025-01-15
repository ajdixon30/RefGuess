const mlb = document.querySelector("#MLB")
const nba = document.querySelector("#NBA")
const quizContainer = document.querySelector("#quiz-container")
const answerForm = document.querySelector("#answer-form")
const slidesStatus = document.querySelector("#slides-status")
const playerScore = document.querySelector("#player-score")
const giveUp = document.querySelector("#give-up")
const slidesContainer = document.querySelector("#slides-container")
const numbersContainer = document.querySelector("#numbers-container")
const nextBtn = document.querySelector('#next-btn')
const prevBtn = document.querySelector('#prev-btn')
const modal = document.querySelector('.modal')
let currentSlide = 1
let players = []
let correctAnswers = 0

answerForm.classList.add('hidden')
modal.classList.add('hidden')

const showSlide = (slideNumber) => {
    let slides = document.querySelectorAll('.slide')
    if (slideNumber > slides.length) currentSlide = 1
    if (slideNumber < 1) currentSlide = slides.length
    slidesStatus.textContent = `${currentSlide}/${slides.length}`
    for (let i = 0; i < slides.length; i++) {
        if (currentSlide === i + 1) {
            slides[i].classList.remove('hidden')
        } else {
            slides[i].classList.add('hidden')
        }
    }
}

const nextSlide = () => {
    currentSlide++
    showSlide(currentSlide)
}

const prevSlide = () => {
    currentSlide--
    showSlide(currentSlide)
}

const selectSlide = (e) => {
    currentSlide = Number(e.target.textContent)
    showSlide(currentSlide)
}

const clearQuiz = () => {
    players = []
    correctAnswers = 0
    currentSlide = 1
    slidesContainer.innerHTML = ''
    numbersContainer.innerHTML = ''
}

const quitGame = () => {
    const slides = document.querySelectorAll('.slide')
    const slideNumbers = document.querySelectorAll('.slide-number')
    for (let i = 0; i < players.length; i++) {
        if (!slides[i].classList.contains('correct')) {
            slides[i].lastChild.classList.add('incorrect')
            slides[i].lastChild.classList.remove('hidden')
            slides[i].firstChild.classList.add('complete')
            slideNumbers[i].classList.add('incorrectNumber')
        }
    }
}

const correctAnswer = (slide, number) => {
    slide.lastChild.classList.remove('hidden')
    slide.lastChild.classList.add('correct')
    slide.firstChild.classList.add('complete')
    number.classList.add('correctNumber')
    correctAnswers++
    playerScore.textContent = `${(correctAnswers/players.length)*100}%`
}

const selectCategory = (e) => {
    const category = e.target.textContent
    clearQuiz()
    switch (category) {
        case 'MLB':
            createQuiz(category)
            answerForm.classList.remove('hidden')
            break
        case 'NBA':
            createQuiz(category)
            answerForm.classList.remove('hidden')
            break
        default:
            break
    }
}

const createQuiz = (category) => {
    switch (category) {
        case 'MLB':
            for (let i = 0; i < 5; i++) {
                let index = Math.floor(Math.random() * MLBQuizzes[0].answers.length)
                let playerToGuess = MLBQuizzes[0].answers.splice(index, 1)
                players.push(playerToGuess[0])
            }
            break
        case 'NBA':
            for (let i = 0; i < 5; i++){
                let index = Math.floor(Math.random() * NBAQuizzes[0].answers.length);
                let playerToGuess = NBAQuizzes[0].answers.splice(index, 1)
                players.push(playerToGuess[0])
            }
            break
        default:
            break
    }
    slidesStatus.textContent = `${currentSlide}/${players.length}`
    playerScore.textContent = `${correctAnswers/players.length}%`
    for (let i = 0; i < players.length; i++){
        let slideNumber = document.createElement('button')
        slideNumber.textContent = i + 1
        slideNumber.classList.add('button', 'slide-number')
        slideNumber.onclick = selectSlide
        numbersContainer.append(slideNumber)
        let screenshot = document.createElement("img")
        screenshot.classList.add('screenshot')
        screenshot.src = players[i].img
        let headshot = document.createElement('img')
        headshot.classList.add('headshot')
        headshot.src = players[i].headshot
        let playerName = document.createElement('p')
        playerName.classList.add('playerName')
        playerName.textContent = players[i].name
        let infoContainer = document.createElement('div')
        infoContainer.classList.add('container', 'hidden', 'playerInfo')
        infoContainer.append(headshot, playerName)
        let divEl = document.createElement("div")
        if (i === 0) {
            divEl.classList.add('slide')
        } else {
            divEl.classList.add('hidden', 'slide')
        }
        divEl.append(screenshot, infoContainer)
        slidesContainer.appendChild(divEl)
    }
}

const validateAnswer = (e) => {
    e.preventDefault()
    let currentSlide, currentNumber
    const slides = document.querySelectorAll('.slide')
    const numbers = document.querySelectorAll('.slide-number')
    for (let i = 0; i < slides.length; i++){
        if (!slides[i].classList.contains('hidden')) {
            currentSlide = slides[i]
            currentNumber = numbers[i]
        }
    }
    const guess = e.target.guess.value.toLowerCase().trim()
    const playerName = currentSlide.lastChild.textContent.toLowerCase()
    if (guess === playerName) {
        correctAnswer(currentSlide, currentNumber)
        setTimeout(() => nextSlide(), 1500)
    }
    e.target.guess.value = ''
}

mlb.onclick = selectCategory
nba.onclick = selectCategory
prevBtn.onclick = prevSlide
nextBtn.onclick = nextSlide
answerForm.addEventListener('submit', validateAnswer)
giveUp.onclick = quitGame