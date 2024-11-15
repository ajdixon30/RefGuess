const categories = document.querySelector("#categories");
const question = document.querySelector("#question");
const quizName = document.querySelector("#quiz-name");
const playerStatus = document.querySelector("#player-status");
const answerForm = document.querySelector("#answer-form");
const answerTextbox = document.querySelector("#answer-textbox");
const submitButton = document.querySelector("#submit-button");
const feedback = document.querySelector("#feedback-text");
const mlb = document.querySelector("#MLB");
const nba = document.querySelector("#NBA");
const table = document.querySelector("#answers-table");
const tableHeader = document.querySelector("#table-header");
const tableBody = document.querySelector("#table-body");
const imageCarousel = document.querySelector("#image-carousel");
let selectedCategory = "";
const timer = 300;
const quizList = document.querySelector("#quiz-list");
let answerBank = [];
let slideIndex = 1;
let currentQuiz = '';
let giveUp = false;
let player;
let modal = document.querySelector("#modal")
let modalContent = document.querySelector("#modal-content")
let modalButton = document.querySelector("#modal-button")
let modalText = document.querySelector("#modal-text")

//Enable all buttons
const resetButtons = () => {
    mlb.disabled = false;
    nba.disabled = false;
}

//Remove all list items from the webpage
const resetQuizList = () => {
    quizList.innerHTML = "";
}

//Display the quizzes for the MLB category
const selectMLB = (e) => {
    createList(e.target);
}

//Display the quizzes for the NBA category
const selectNBA = (e) => {
    createList(e.target);
}

const showModal = () => {
    blurImage()
    modalText.innerHTML = `Score:&nbsp;${player.score}`
    modalText.setAttribute('id', 'modal-text')
    modalButton.textContent = "X"
    modalButton.setAttribute('id', 'modal-button')
    modal.setAttribute('class', 'show')
}

const hideModal = () => {
    modal.setAttribute('class', 'hide')
    removeBlur()
}

const blurImage = () => {
    imageCarousel.setAttribute('class', 'blurred')
}

const removeBlur = () => {
    imageCarousel.setAttribute('class', '')
}

//Present the slides for the "Guess The Player" quizzes
const showSlides = (n) => {
    //Capture the "div" elements containing the player screenshots
    let slides = document.getElementsByClassName("guessPlayer");
    //Capture the "span" elements containing the player names
    let playerNames = document.getElementsByClassName("playerName");
    //Capture the "span" elements displaying the slide count
    let slideCount = document.querySelector(".slideCount");
    //Capture the slide number "button" elements 
    let slideNumbers = document.getElementsByClassName("slideNumber");
    //If the slide count goes below 1, reset the count to the last slide number
    if (n < 1) { slideIndex = slides.length; }
    //If the slide count goes over the number of slides, reset the count to 1
    if (n > slides.length) { slideIndex = 1; }
    //Hide all of the "Guess The Player" slides
    for (let i = 0; i < slides.length; i++){
        slides[i].setAttribute('class', 'guessPlayer hidden')
        slideCount.innerText = `${slideIndex}/${slides.length}`;
        slideNumbers[i].setAttribute('id', '');
    }
    //Disable the textbox for the solved players
    if (playerNames[slideIndex - 1].classList.contains("correct") || giveUp == true) {
        answerTextbox.disabled = true;
    } else {
        answerTextbox.disabled = false;
    }
    //Display the player screenshot at the specified index
    slides[slideIndex - 1].setAttribute('class', 'guessPlayer current');
    slideNumbers[slideIndex - 1].setAttribute('id', 'currentNumber');
}

//Increase the slide index by 1
const nextSlide = () => {
    slideIndex++;
    showSlides(slideIndex);
}

//Decrease the slide index by 1
const prevSlide = () => {
    slideIndex--;
    showSlides(slideIndex);
}

//Select specified slide
const selectSlide = (e) => {
    slideIndex = e.target.innerText;
    showSlides(slideIndex);
}

const startGame = () => {
    giveUp = false
    answerTextbox.disabled = false
    let playerQuestions = document.querySelectorAll('.guessPlayer')
    player = new Player(playerQuestions.length);
    let playerNumber = document.querySelector('.score')
    playerNumber.innerText = player.score
}

//Present the names of the unsolved players
const iGiveUp = () => {
    giveUp = true;
    answerTextbox.disabled = true
    let giveUpButton = document.querySelector('.giveUp')
    giveUpButton.disabled = true
    player.gameOver = true
    //Capture the "div" elements containing the player screenshots
    let slides = document.querySelectorAll(".guessPlayer");
    let slideNumbers = document.getElementsByClassName("slideNumber");
    for (let i = 0; i < slides.length; i++){
        //Show the names of the unsolved players in red
        if (!slides[i].lastChild.classList.contains("correct")) {
            slides[i].style = "opacity: 0.5";
            slides[i].lastChild.setAttribute("class", "playerName incorrect");
        }
        if (!slideNumbers[i].classList.contains("correctNumber")) {
            slideNumbers[i].setAttribute('class', 'slideNumber incorrectNumber');
        }
    }
    player.updateStatus()
    console.log(player.status)
    showModal()
    blurImage()
}

//Create the list of available quizzes in each category
const createList = (category) => {
    //Enable all of the buttons
    resetButtons();
    //Remove any present list elements
    resetQuizList();
    //Disable the button for the selected category
    category.disabled = true;
    //Create the "list" element to hold the quizzes in each category
    let list = document.createElement("ul");
    list.setAttribute('class', 'list');
    //Create list items based on the selected category
    switch (category.innerText) {
        //Display all MLB Quizzes
        case "MLB":
            selectedCategory = "MLB";
            MLBQuizzes.forEach((quiz) => {
                let quizName = document.createElement("li");
                quizName.innerText = quiz.name;
                quizName.setAttribute('class', 'list_item');
                quizName.addEventListener('click', selectQuiz);
                list.appendChild(quizName);
            })
            break;
        //Display all NBA Quizzes
        case "NBA":
            selectedCategory = "NBA";
            NBAQuizzes.forEach((quiz) => {
                let quizName = document.createElement("li");
                quizName.innerText = quiz.name;
                quizName.setAttribute('class', 'list_item');
                quizName.addEventListener('click', selectQuiz);
                list.appendChild(quizName);
            })
            break;
        default:
            break;
    }
    quizList.appendChild(list);
}

//Present the quiz selected by the player
const selectQuiz = (e) => {
    switch (selectedCategory) {
        case "MLB":
            //Capture the name of the selected quiz
            let mlbQuiz = MLBQuizzes.filter((quiz) => e.target.innerText == quiz.name);
            currentQuiz = mlbQuiz[0].name;
            //Capture the answers of the selected quiz
            // answerBank = mlbQuiz[0].answers;
            //Create the table/carousel for the selected quiz
            createTable(mlbQuiz[0]);
            //Start the game
            startGame();
            //Enable all buttons
            resetButtons();
            //Remove list items from the screen
            resetQuizList();
            break;
        case "NBA":
            //Capture the name of the selected quiz
            let nbaQuiz = NBAQuizzes.filter((quiz) => e.target.innerText == quiz.name);
            currentQuiz = nbaQuiz[0].name;
            //Capture the answers of the selected quiz
            //answerBank = nbaQuiz[0].answers;
            //Create the table/carousel of the selected quiz
            createTable(nbaQuiz[0]);
            //Start the game
            startGame();
            //Enable all buttons
            resetButtons();
            //Remove list items from the screen
            resetQuizList();
            break;
        default:
            break;
    }
}

const createTable = (quiz) => {
    //Remove the Table if it exists
    resetTable();
    //Remove the images if they exist
    resetImages();
    //For Non "Guess The Player" Quizzes
    if (quiz.name != "Guess The Player") {
        //Create the row for table headings
        let headerRow = document.createElement('tr');
        //Create the "Year" table heading
        let yearHeading = document.createElement('th');
        yearHeading.setAttribute('class', 'heading');
        yearHeading.innerText = quiz.headings[0];
        //Create the "Name" table heading
        let nameHeading = document.createElement('th');
        nameHeading.setAttribute('class', 'heading');
        nameHeading.innerText = quiz.headings[1];
        headerRow.append(yearHeading, nameHeading);
        tableHeader.appendChild(headerRow);
        //Create the table body rows for all of the quiz answers
        quiz.answers.forEach((answer) => {
            //Create a new row in the table
            let newRow = document.createElement('tr');
            //Create a new element in the "Year" column
            let yearEntry = document.createElement('th');
            yearEntry.setAttribute('class', 'ready year');
            //Create a new element in the "Name" column
            let nameEntry = document.createElement('td');
            nameEntry.setAttribute('class', `${answer.name.toLowerCase().replace(' ', '-')} ready name`)
            yearEntry.innerText = answer.year;
            newRow.append(yearEntry, nameEntry);
            tableBody.appendChild(newRow);
        })
        table.setAttribute('class', 'ready');
    //For "Guess The Player" Quizzes
    } else {
        //Reset the slide index to 1
        slideIndex = 1;
        //Create the player score
        let playerScore = document.createElement('span')
        playerScore.setAttribute('class', 'score')
        //Create the previous button
        let prevButtonSpan = document.createElement('span')
        prevButtonSpan.setAttribute('class', 'prevSpan')
        let prevButton = document.createElement("a");
        prevButton.setAttribute('class', 'prev');
        prevButton.innerHTML = "&#10094;";
        prevButton.onclick = prevSlide;
        prevButtonSpan.append(prevButton)
        //Create the next button
        let nextButtonSpan = document.createElement('span')
        nextButtonSpan.setAttribute('class', 'nextSpan')
        let nextButton = document.createElement("a");
        nextButton.setAttribute('class', 'next');
        nextButton.innerHTML = "&#10095;";
        nextButton.onclick = nextSlide;
        nextButtonSpan.append(nextButton)
        //Create the element to display the current slide count
        let slideCount = document.createElement("span");
        slideCount.setAttribute('class', 'slideCount');
        slideCount.innerText = "";
        //Create the "Give Up" button
        let giveUp = document.createElement("button");
        giveUp.innerText = "Give Up";
        giveUp.setAttribute('class', 'giveUp');
        giveUp.onclick = iGiveUp;
        let slideCounter = document.createElement("div");
        slideCounter.setAttribute('class', 'slideCounter');
        //Add the created elements to the image carousel
        imageCarousel.append(playerScore, prevButtonSpan, slideCount, nextButtonSpan, playerScore, giveUp, slideCounter);
        //Grab ten screenshots
        for (let i = 0; i < 5; i++){
            //Generate a random number between 1 and 50
            let index = Math.floor(Math.random() * quiz.answers.length);
            //Grab the random player from the answer bank
            let playerToGuess = quiz.answers.splice(index, 1);
            answerBank.push(playerToGuess[0].name)
            //Create the "div" element for the image carousel
            let imgDiv = document.createElement("div");
            imgDiv.setAttribute('class', 'guessPlayer');
            imgDiv.setAttribute('id', `${playerToGuess[0].name.toLowerCase().replaceAll(' ', '-')}`);
            //Create the "img" element for player screenshot
            let bbRefImg = document.createElement("img");
            bbRefImg.setAttribute('style', 'width:100%');
            bbRefImg.setAttribute('src', playerToGuess[0].img);
            //Create the "span" element to hold the player's name
            let playerName = document.createElement("span");
            playerName.innerText = playerToGuess[0].name;
            //Hide the name from the players
            playerName.setAttribute('class', 'playerName hidden');
            //Create "button" element for slide number
            let slideNumber = document.createElement("button");
            slideNumber.innerText = i + 1;
            slideNumber.setAttribute('class', 'slideNumber');
            slideNumber.onclick = selectSlide;
            slideCounter.appendChild(slideNumber);
            imgDiv.append(bbRefImg, playerName);
            imageCarousel.appendChild(imgDiv);
        }
        //Show the first image to the player
        showSlides(slideIndex);
    }
}

//Remove the table from the webpage
const resetTable = () => {
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";
    table.setAttribute('class', '');
}

//Remove the screenshots from the Image Carousel
const resetImages = () => {
    imageCarousel.innerHTML = "";
}

//Validating the User's Answer
const validateAnswer = (e) => {
    e.preventDefault();
    //Non "Guess The Player" Quizzes
    if (currentQuiz != "Guess The Player") {
        answerBank.forEach((answer) => {
            //Check if the player's guess is in the answerBank
            if (e.target.guess.value.toLowerCase() == answer.name.toLowerCase()) {
                //Check if the answer exists more than once in the answerBank
                let tableRows = document.querySelectorAll(`.${e.target.guess.value.toLowerCase().replaceAll(' ', '-')}`);
                for (const row of tableRows) {
                    //Present the answer within the table
                    row.innerText = e.target.guess.value;
                }
            }
        })
    //"Guess The Player" Quizzes
    } else {
        //Capture the screenshot displayed on the screen
        let playerToGuess = document.querySelector('.current');
        let currentSlide = document.querySelector('#currentNumber');
        //Check if the player's guess is correct
        if (e.target.guess.value.toLowerCase() == playerToGuess.id.replaceAll('-', ' ')) {
            playerToGuess.style = "opacity: 0.5";
            //Show the solved player's name in green
            playerToGuess.lastChild.setAttribute('class', 'playerName correct');
            currentSlide.setAttribute('class', 'slideNumber correctNumber');
            currentSlide.disabled = true;
            setTimeout(() => nextSlide(), 1500)
        }
    }
    //Remove the "correct" answer from the answerBank
    answerBank = answerBank.filter((answer) => answer != e.target.guess.value);
    player.updateScore()
    player.updateStatus()
    if (player.status === 'Winner') {
        showModal()
    }
    //Clear the textbox within the answer form
    e.target.guess.value = '';
}

mlb.onclick = selectMLB;
nba.onclick = selectNBA;
answerForm.addEventListener('submit', validateAnswer);
modalButton.onclick = hideModal