let tripleCrownBatters = [["Miguel Cabrera", 2012], ["Carl Yastrzemski", 1967], ["Frank Robinson", 1966],
["Mickey Mantle", 1956], ["Lester Lockett", 1948], ["Ted Williams", 1947],
["Ted Williams", 1942], ["Lennie Pearson", 1942], ["Ted Strong", 1942],
["Joe Medwick", 1937], ["Josh Gibson", 1937], ["Josh Gibson", 1936],
["Lou Gehrig", 1934], ["Jimmie Foxx", 1933], ["Chuck Klein", 1933], ["Willie Wells", 1930], ["Mule Settles", 1926],
["Oscar Charleston", 1925], ["Rogers Hornsby", 1925], ["Oscar Charleston", 1924], ["Heavy Johnson", 1923],
["Rogers Hornsby", 1922], ["Oscar Charleston", 1921], ["Heinie Zimmerman", 1912],
    ["Ty Cobb", 1909], ["Nap Lojoie", 1901], ["Tip O'Neill", 1887], ["Paul Hines", 1878]];

let tripleCrownPitchers = [["Shane Bieber", 2020], ["Justin Verlander", 2011], ["Clayton Kershaw", 2011],
["Jake Peavy", 2007], ["Johan Santana", 2006], ["Randy Johnson", 2002], ["Pedro Martinez", 1999], ["Roger Clemens", 1998],
['Roger Clemens', 1997], ['Dwight Gooden', 1985], ['Steve Carlton', 1972], ['Sandy Koufax', 1966], ['Sandy Koufax', 1965],
['Sandy Koufax', 1963], ['Hal Newhouser', 1945], ['Johnny Wright', 1943], ['Bob Feller', 1940], ['Bucky Walters', 1939],
['Hilton Smith', 1938], ['Ray Brown', 1938], ['Lefty Gomez', 1937], ['Lefty Gomez', 1934], ['Slim Jones', 1934],
['Lefty Grove', 1931], ['Lefty Grove', 1930], ['Walter Johnson', 1924], ['Dazzy Vance', 1924], ['Grover Alexander', 1920],
['Walter Johnson', 1918], ['Hippo Vaughn', 1918], ['Grover Alexander', 1916], ['Grover Alexander', 1915], ['Walter Johnson', 1913],
['Christy Mathewson', 1908], ['Rube Waddell', 1905], ['Christy Mathewson', 1905], ['Cy Young', 1901], ['Amos Rusie', 1894], ['John Clarkson', 1889],
    ['Tim Keefe', 1888], ['Guy Hecker', 1884], ['Old Hoss Radbourn', 1884], ['Tommy Bond', 1877]];

let baseballRefScreenshots = [];

let MLBQuizNames = [["Triple Crown Batters", tripleCrownBatters], ["Triple Crown Pitchers", tripleCrownPitchers], ["Guess the Player", baseballRefScreenshots]];


let categories = document.querySelector("#categories");
let question = document.querySelector("#question");
let quizName = document.querySelector("#quiz-name");
let playerStatus = document.querySelector("#player-status");
let answerForm = document.querySelector("#answer-form");
let answerTextbox = document.querySelector("#answer-textbox");
let submitButton = document.querySelector("#submit-button");
let feedback = document.querySelector("#feedback-text");
let mlb = document.querySelector("#MLB");
let nba = document.querySelector("#NBA");
let ncaa = document.querySelector("#NCAA");
let tv = document.querySelector("#TV");
let table = document.querySelector("#answers-table");
let tableHeader = document.querySelector("#table-header");
let tableBody = document.querySelector("#table-body");
let selectedCategory = "";
let timer = 300;
let correctAnswers = 0;
let possibleAnswers = 0;
let quizList = document.querySelector("#quiz-list");

mlb.onclick = selectMLB;
nba.onclick = selectNBA;
ncaa.onclick = selectNCAA;
tv.onclick = selectTV;
answerForm.addEventListener('submit', validateAnswer);

function enableAllButtons() {
    for (const child of categories.children) {
        child.disabled = false;
    }
}

function selectMLB() {
    clearTable();
    resetAnswers();
    enableAllButtons();
    resetScore();
    mlb.disabled = true;
    selectedCategory = "MLB";
    let list = document.createElement("ul");
    list.setAttribute('class', 'list');
    for (const name of MLBQuizNames) {
        console.log(name);
        let item = document.createElement('li');
        item.innerText = name[0];
        item.setAttribute('class', 'list_item');
        item.setAttribute('id', name[0].toLowerCase().replaceAll(' ', '-'));
        list.appendChild(item);
    }
    quizList.appendChild(list);
    let batters = document.querySelector("#triple-crown-batters");
    batters.onclick = startTripleCrownBatters;
    let pitchers = document.querySelector("#triple-crown-pitchers");
    pitchers.onclick = startTripleCrownPitchers;
    // quizName.innerText = "Triple Crown Winners (Batters)";
    // const topRow = document.createElement('tr');
    // let name = document.createElement('th');
    // name.innerText = "Name";
    // let year = document.createElement('th');
    // year.innerText = "Year";
    // tableHeader.appendChild(topRow);
    // topRow.append(year, name);
    possibleAnswers = tripleCrownBatters.length;
    // playerStatus.innerText = `Score: ${correctAnswers}/${possibleAnswers}`;
    // createBlankTable(tripleCrownBatters);
}

function selectNBA() {
    clearTable();
    resetAnswers();
    enableAllButtons();
    resetScore();
    nba.disabled = true;
    selectedCategory = "NBA";
    quizName.innerText = "All-Star Game MVPs";
    playerStatus.innerText = `Score: ${correctAnswers}/${possibleAnswers}`;
}

function selectNCAA() {
    clearTable();
    resetAnswers();
    enableAllButtons();
    resetScore();
    ncaa.disabled = true;
    selectedCategory = "NCAA";
    quizName.innerText = "National Player of the Year Winners";
    playerStatus.innerText = `Score: ${correctAnswers}/${possibleAnswers}`;
}

function selectTV() {
    clearTable();
    resetAnswers();
    enableAllButtons();
    resetScore();
    tv.disabled = true;
    selectedCategory = "TV";
    quizName.innerText = "Cartoon Theme Songs";
    playerStatus.innerText = `Score: ${correctAnswers}/${possibleAnswers}`;
}

function validateAnswer(e) {
    e.preventDefault();
    if (selectedCategory == "MLB") {
        for (const player of tripleCrownBatters) {
            if (player[0].toLowerCase() == answerTextbox.value.toLowerCase()) {
                let tableRows = document.querySelectorAll(`.${answerTextbox.value.toLowerCase().replace(' ', '-')}`);
                for (const row of tableRows) {
                    row.innerText = answerTextbox.value;
                }
            }
        }
        tripleCrownBatters = tripleCrownBatters.filter((answer) => answer[0] != answerTextbox.value);
        console.log(tripleCrownBatters);
    } else if (selectedCategory == "NBA") {
        
    } else if (selectedCategory == "NCAA") {
        
    } else if (selectedCategory == "TV") {
        
    }
    correctAnswers = possibleAnswers - tripleCrownBatters.length;
    answerTextbox.value = "";
    playerStatus.innerText = `Score: ${correctAnswers}/${possibleAnswers}`;
}

function createBlankTable(array) {
    let columnNames = document.createElement("tr");
    let columnName = document.createElement('th');
    columnName.setAttribute('class', 'heading');
    columnName.innerText = "Name";
    let columnYear = document.createElement('th');
    columnYear.setAttribute('class', 'heading');
    columnYear.innerText = "Year";
    columnNames.append(columnYear, columnName);
    tableHeader.appendChild(columnNames);
    array.forEach((entry) => {
        console.log(entry);
        let newRow = document.createElement('tr');
        let year = document.createElement('th');
        let name = document.createElement('td');
        year.innerText = entry[1];
        year.setAttribute('class', 'ready year');
        newRow.append(year, name);
        name.setAttribute('class', `${entry[0].toLowerCase().replace(' ', '-')} ready name`);
        tableBody.appendChild(newRow);
    })
    table.setAttribute('class', 'ready');
}

function clearTable() {
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";
}

function resetAnswers() {
    tripleCrownBatters = [["Miguel Cabrera", 2012], ["Carl Yastrzemski", 1967], ["Frank Robinson", 1966],
    ["Mickey Mantle", 1956], ["Lester Lockett", 1948], ["Ted Williams", 1947],
    ["Ted Williams", 1942], ["Lennie Pearson", 1942], ["Ted Strong", 1942],
    ["Joe Medwick", 1937], ["Josh Gibson", 1937], ["Josh Gibson", 1936],
    ["Lou Gehrig", 1934], ["Jimmie Foxx", 1933], ["Chuck Klein", 1933], ["Willie Wells", 1930], ["Mule Settles", 1926],
    ["Oscar Charleston", 1925], ["Rogers Hornsby", 1925], ["Oscar Charleston", 1924], ["Heavy Johnson", 1923],
    ["Rogers Hornsby", 1922], ["Oscar Charleston", 1921], ["Heinie Zimmerman", 1912],
    ["Ty Cobb", 1909], ["Nap Lojoie", 1901], ["Tip O'Neill", 1887], ["Paul Hines", 1878]];
}

function resetScore() {
    possibleAnswers = 0;
    correctAnswers = 0;
}

function startTripleCrownBatters() {
    clearTable();
    createBlankTable(tripleCrownBatters);
}

function startTripleCrownPitchers() {
    clearTable();
    createBlankTable(tripleCrownPitchers);
}