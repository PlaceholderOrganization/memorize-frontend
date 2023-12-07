import { API_URL } from "../../settings.js";

let cardDataArray = []; // Defines cardDataArray at the top level of the module
let unchangedArray = []
let correctGuesses = [];
let incorrectGuesses = [];
let isCardRevealed = false;
let notFirstCard = false
let currentIndex = 0;
let startTime;
let nameField;
let actionField; 
let objectField;
let cardField;


export async function initQuiz(){


    console.log("QUIZ! QUIZ! QUIZ!");

    const personCheckbox = document.getElementById('personCheckbox');
    const actionCheckbox = document.getElementById('actionCheckbox')
    const objectCheckbox = document.getElementById('objectCheckbox');
    const cardCheckbox = document.getElementById('cardCheckbox');
    nameField = document.getElementById('name');
    actionField = document.getElementById('action');
    objectField = document.getElementById('object');
    cardField = document.getElementById('card');

    // Call inital fetchCardData to fetch first record and render quiz data
    fetchCardData();

    // Add event listener to the 'Next' button
    document.getElementById('next-card-btn').addEventListener('click', fetchRandomCardData);
    // Add event listener to the 'Show' button
    document.getElementById("show-card-btn").addEventListener("click", function() {
        checkAnswers(cardDataArray[currentIndex]);
    })
    document.getElementById("play-again-btn").addEventListener("click", resetCardArrays)
    document.getElementById("save-score-btn").addEventListener("click", saveScore)

    //Add event listener for keystrokes
    document.addEventListener("keydown", handleShortCuts);

    //Add event listeners to checkboxes
    personCheckbox.addEventListener('change', checkPersonCheckBox);
    actionCheckbox.addEventListener('change', checkActionCheckBox);
    objectCheckbox.addEventListener('change', checkObjectCheckBox);
    cardCheckbox.addEventListener('change', checkCardCheckBox);

}

async function fetchCardData() {

    try {
        const response = await fetch(`${API_URL}/quiz`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let quizData = await response.json(); // Store response in global array
        //quizData is an array of quizes, so can't get cards by writing quizData.cards. Need to specify the quiz array index, or fix the backend
        cardDataArray = cardDataArray.concat(quizData[0].cards)
        unchangedArray.push(...cardDataArray);

        if (cardDataArray.length > 0) {
            console.log(cardDataArray.length)
            populateCardData(cardDataArray[0]); // First record
        } else {
            console.log('No records found in the response');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    startTime = Date.now();
    // showTimer();
}

function fetchRandomCardData() {
    if(notFirstCard) {
        filterCorrectIncorrect()
        }      
    let endTime = Date.now();
    let time = (endTime-startTime)/1000;
    document.getElementById("timer-badge").innerText = time
    if(cardDataArray.length ===1) {
        document.getElementById("next-card-btn").innerText = "Finish";
    }

    if (cardDataArray && cardDataArray.length > 0) {
        console.log(cardDataArray.length)
        const randomIndex = Math.floor(Math.random() * cardDataArray.length);
        populateCardData(cardDataArray[randomIndex]); // Using global array
        currentIndex = randomIndex;
        console.log("current " + currentIndex + "  random " + randomIndex)

    } else {
        showScore(time)
        toggleDisplayStyle("next-card-btn");
        toggleDisplayStyle("play-again-btn");

    }        

    console.log("Correct: " + correctGuesses.length)
    console.log("incorrect: " + incorrectGuesses.length)
 
    isCardRevealed = false;
    notFirstCard = true
}

function populateCardData(card) {
      if (personCheckbox.checked){
        nameField.value = card.person || '';
        toggleFieldStyle(nameField, 'correct-input')
    } else {nameField.value = '';
            toggleFieldStyle(nameField, '');}
    
    if (actionCheckbox.checked){
        actionField.value = card.action || '';
    } else {actionField.value = '';}
    
    if (objectCheckbox.checked){
        objectField.value = card.object || ''; 
    } else {objectField.value = '';}
    
    if (cardCheckbox.checked){
        cardField.value = card.value + " of " + card.suit || '';
    } else {cardField.value = '';}
    
    document.getElementById('current-card-image').src = card.image || '';
}

const shortHandMapping = {
    'd1': 'ace of diamonds',
    'd2': '2 of diamonds',
    'd3': '3 of diamonds',
    'd4': '4 of diamonds',
    'd5': '5 of diamonds',
    'd6': '6 of diamonds',
    'd7': '7 of diamonds',
    'd8': '8 of diamonds',
    'd9': '9 of diamonds',
    'd10': '10 of diamonds',
    'd11': 'jack of diamonds',
    'd12': 'queen of diamonds',
    'd13': 'king of diamonds',
    'h1': 'ace of hearts',
    'h2': '2 of hearts',
    'h3': '3 of hearts',
    'h4': '4 of hearts',
    'h5': '5 of hearts',
    'h6': '6 of hearts',
    'h7': '7 of hearts',
    'h8': '8 of hearts',
    'h9': '9 of hearts',
    'h10': '10 of hearts',
    'h11': 'jack of hearts',
    'h12': 'queen of hearts',
    'h13': 'king of hearts',
    'c1': 'ace of clubs',
    'c2': '2 of clubs',
    'c3': '3 of clubs',
    'c4': '4 of clubs',
    'c5': '5 of clubs',
    'c6': '6 of clubs',
    'c7': '7 of clubs',
    'c8': '8 of clubs',
    'c9': '9 of clubs',
    'c10': '10 of clubs',
    'c11': 'jack of clubs',
    'c12': 'queen of clubs',
    'c13': 'king of clubs',
    's1': 'ace of spades',
    's2': '2 of spades',
    's3': '3 of spades',
    's4': '4 of spades',
    's5': '5 of spades',
    's6': '6 of spades',
    's7': '7 of spades',
    's8': '8 of spades',
    's9': '9 of spades',
    's10': '10 of spades',
    's11': 'jack of spades',
    's12': 'queen of spades',
    's13': 'king of spades',    
}


function checkAnswers() {
    const fields = [
        {id: 'name', prop: 'person'},
        {id: 'action', prop: 'action'},
        {id: 'object', prop: 'object'},
    ];

    fields.forEach(field => {
        const userInput = document.getElementById(field.id).value.trim().toLowerCase();
        const correctAnswer = (cardDataArray[currentIndex][field.prop] || '').trim().toLowerCase();

        console.log(`Checking ${field.id}: User input: '${userInput}', Correct answer: '${correctAnswer}'`);

        const element = document.getElementById(field.id);
        if (element) {
            element.style.backgroundColor = (userInput == correctAnswer ? 'green' : 'red');
            element.value = correctAnswer;
        } else {
            console.error(`Element with id '${field.id}' not found`);
        }
    });

    const cardInput = document.getElementById('card').value.trim().toLowerCase();
    const cardValue = (cardDataArray[currentIndex]['value'] || '').trim().toLowerCase();
    const cardSuit = (cardDataArray[currentIndex]['suit'] || '').trim().toLowerCase();
    const correctCard = `${cardValue} of ${cardSuit}`
    const shorthandCard = shortHandMapping[cardInput] || '';

    console.log(`Checking card: User input: '${cardInput}', Correct answer: '${correctCard}'`);

    const cardElement = document.getElementById('card');
    if (cardElement) {
        cardElement.style.backgroundColor = (cardInput === correctCard || cardInput === shorthandCard) ? 'green' : 'red';
        cardElement.value = correctCard;
    } else {
        console.error(`Element with id 'card' not found`);
    }
}

function filterCorrectIncorrect() {
    if(isCardRevealed==true) {
        incorrectGuesses.push(cardDataArray[currentIndex])
        cardDataArray.splice(currentIndex, 1)
    }
    else {
        correctGuesses.push(cardDataArray[currentIndex])
        cardDataArray.splice(currentIndex, 1)
    }
}

function toggleDisplayStyle(btn) {
    var btn = document.getElementById(btn);
    if(btn.style.display ==="none") {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function togglePlayAgainBtn() {
    var nextBtn = document.getElementById("next-card-btn");
    var againBtn = document.getElementById("play-again-btn");
    if(nextBtn.style.display ==="none") {
        againBtn.style.display = "block";
    } else {
        againBtn.style.display = "none";
    }
}

function resetCardArrays() {
    cardDataArray = unchangedArray.slice();
    correctGuesses.length = 0;
    incorrectGuesses.length = 0;
    toggleDisplayStyle("next-card-btn");
    toggleDisplayStyle("play-again-btn");
    notFirstCard = false;
    startTime = Date.now()
    fetchRandomCardData()
    document.getElementById("next-card-btn").innerText = "Next";
    toggleDisplayStyle("score-badge")
    document.getElementById("timer-badge").innerText = "Timer"
    document.getElementById("save-score-btn").style.display = "none";
}

function showScore(time) {
    toggleDisplayStyle("score-badge")
    if(window.localStorage.getItem("roles") == "USER") {
        console.log(window.localStorage.getItem("roles"))
        toggleDisplayStyle("save-score-btn")
    }
    document.getElementById("timer-badge").innerText = time;
    document.getElementById("score-badge").innerText = "Score: "+correctGuesses.length + " out of " + unchangedArray.length;

}

async function saveScore() {

    const username = window.localStorage.getItem("username")
    const quiz_id = 1
    let time = document.getElementById("timer-badge").innerText
    let scoreNumber = document.getElementById("score-badge").innerText
    const payload = {
        username,
        quiz_id,
        time,
        scoreNumber
        };
    
        try {
        const response = await fetch(`${API_URL}/score`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }) 
        if (response.ok) {
            console.log("save succesful")
        }
        } catch (err) {
            console.log(err)
        }
}



// function showTimer() {
//     let date = new Date()
//     let min = date.getMinutes();
//     let sec = date.getSeconds();
//     let mil = date.getMilliseconds();

//     min = (min < 10) ? "0" + min : min;
//     sec = (sec < 10) ? "0" + sec : sec;

//     let time = min + ":" + sec + ":" + (mil/100)
//     document.getElementById("clock-btn").innerText = time;
//     var updateTime = setTimeout(function() {showTimer()}, 199)
//     console.log(time)
    
// }


// Jakobs gamle kode..

// function handleShortCuts (evt) {
//     if (evt.key === "n"){
//         evt.preventDefault();
//         fetchRandomCardData();
//     }
//     if (evt.key === "s"){
//         evt.preventDefault();
//         //TODO SHOW CARD
//     }
// }


function handleShortCuts (evt) {
    if (evt.altKey && evt.code === 'KeyN' && document.getElementById("next-card-btn").style.display !== "none"){
        evt.preventDefault();
        document.getElementById("next-card-btn").click();
    }
    if (evt.altKey && evt.code === 'KeyS'){
        evt.preventDefault();
        document.getElementById("show-card-btn").click();
    }
    if (evt.altKey && evt.code === 'KeyP'){
        document.getElementById("person").focus();
    }
    if (evt.altKey && evt.code === 'KeyA'){
        document.getElementById("action").focus();
    }
    if (evt.altKey && evt.code === 'KeyO'){
        document.getElementById("object").focus();
    }
    if (evt.altKey && evt.code === 'KeyC'){
        document.getElementById("card").focus();
    }
}

function checkPersonCheckBox(evt){

    if (evt.target.checked){
        nameField.value = cardDataArray[currentIndex].person || '';
        toggleFieldStyle(nameField, 'correct-input');
    } else {
        document.getElementById('name').value = '';
        toggleFieldStyle(nameField, '');
    }
}

function checkActionCheckBox(evt){
    
    if (evt.target.checked){
        actionField.value = cardDataArray[currentIndex].action || '';
        toggleFieldStyle(actionField, 'correct-input');
    } else {
        document.getElementById('action').value = '';
        toggleFieldStyle(actionField, '');
    }
}

function checkObjectCheckBox(evt){
    
    if (evt.target.checked){
        objectField.value = cardDataArray[currentIndex].object || '';
        toggleFieldStyle(objectField, 'correct-input');
    } else {
        objectField.value = '';
        toggleFieldStyle(objectField, '');
    }
}

function checkCardCheckBox(evt){

    if (evt.target.checked){
        cardField.value = cardDataArray[currentIndex].value + " of " + cardDataArray[currentIndex].suit || '';
        toggleFieldStyle(cardField, 'correct-input');
    } else {
        cardField.value = '';
        toggleFieldStyle(cardField, '');
    }
}

function toggleFieldStyle(element, style){
    element.className = 'form-control '+style;
}  
