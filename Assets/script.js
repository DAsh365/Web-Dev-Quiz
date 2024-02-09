const startButton = document.getElementById("start-button");
const quizHeader = document.getElementById("quiz-header");
const quizContent = document.getElementById("quiz-content");
const questionContainer = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highscoreContainer = document.getElementById("highscore-container");
const highscoresList = document.getElementById("highscores-list");
const goBackBtn = document.getElementById("go-back-btn");

let score = 0;
let timer;
let timeLeft = 60;
let currentQuestionIndex = 0;
let highscores = [];

const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Manipulation Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which of the following tags is used to define an unordered list in HTML?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ul>"
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>", "<script link='script.js'>"],
        answer: "<script src='script.js'>"
    },
    {
        question: "Which property is used to change the background color of an element in CSS?",
        options: ["color", "text-color", "background-color", "bgcolor"],
        answer: "background-color"
    }
];

startButton.addEventListener('click', startQuiz);
goBackBtn.addEventListener('click', goBackToQuiz);

function startQuiz() {
    startButton.classList.add("hide");
    quizHeader.classList.add('hide');
    quizContent.classList.remove('hide');

    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
            endQuiz();
        }
    }, 1000);
}

function selectAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
    } else {
        timeLeft -= 10;
        timerDisplay.textContent = timeLeft;
    }

    currentQuestionIndex++;
    setNextQuestion();
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerText = question.question;
        answerButtons.innerHTML = "";

        question.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(option, question.answer));
            answerButtons.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizContent.classList.add('hide');
    highscoreContainer.classList.remove('hide');

    const initials = prompt("Enter your initials:");
    if (initials) {
        const finalScore = score * timeLeft;
        highscores.push({ initials: initials, score: finalScore });
        highscores.sort((a, b) => b.score - a.score);
        highscoresList.innerHTML = "";
        highscores.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${item.initials}: ${item.score}`;
            highscoresList.appendChild(listItem);
        });
        localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function goBackToQuiz() {
    highscoreContainer.classList.add('hide');
    startQuiz();
}

window.onload = function() {
    const storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores) {
        highscores = storedHighscores;
        highscoresList.innerHTML = "";
        highscores.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${item.initials}: ${item.score}`;
            highscoresList.appendChild(listItem);
        });
    }
};
