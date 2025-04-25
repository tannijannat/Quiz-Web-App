let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 300; // 5 minutes in seconds
let questions;
let timerRunning = true;

// Load questions from the JSON file
fetch('questions.json?rand=' + Math.random())
    .then(response => response.json())
    .then(data => {
        questions = getRandomQuestions(data, 15);
        loadQuestion();
        startTimer();
    });

function getRandomQuestions(allQuestions, count) {
    const selected = [];
    const usedIndexes = new Set();

    while (selected.length < count) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            selected.push(allQuestions[randomIndex]);
        }
    }

    return selected;
}



// Load a question and its options
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    document.getElementById('choices').innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = `${letters[index]}. ${option}`;
        button.onclick = () => checkAnswer(option);
        document.getElementById('choices').appendChild(button);
    });

    updateProgress();
}

// Check if the answer is correct (with animation)
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        const optionText = button.textContent.split('. ')[1]; // Remove label "A. " etc.

        if (optionText === correctAnswer || (Array.isArray(correctAnswer) && correctAnswer.includes(optionText))) {
            if (optionText === selectedOption) {
                button.classList.add('correct');
                score++;
            } else {
                button.classList.add('correct');
            }
        } else {
            if (optionText === selectedOption) {
                button.classList.add('incorrect');
            }
        }

        // Disable button to prevent multiple clicks
        button.disabled = true;
    });

    // Update score
    document.getElementById('current-score').textContent = `Your score: ${score}`;

    // Show next question after delay
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < 15) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// Update progress bar and text
function updateProgress() {
    const progressBar = document.getElementById('progressBarFull');
    const progressText = document.getElementById('progress-text');

    progressBar.style.width = `${(currentQuestionIndex / 15) * 100}%`;
    progressText.textContent = `${currentQuestionIndex} of 15`;
}

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (timerRunning) {
                endQuiz();
            }
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// End the quiz
function endQuiz() {
    timerRunning = false;
    document.getElementById('timer').classList.add('hidden');
    document.getElementById('progressBar').classList.add('hidden');
    document.getElementById('choices').classList.add('hidden');
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('question').textContent = `Quiz Finished! You scored ${score} out of 15`;
    document.getElementById('restart-btn').classList.remove('hidden');
}

// Toggle dark mode
const darkModeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeIcon.textContent = "🌞";
    } else {
        themeIcon.textContent = "🌙";
    }
});

// Restart the quiz
// Restart the quiz
document.getElementById('restart-btn').addEventListener('click', () => {
    clearInterval(timerInterval); // 🔁 Clear any existing timer

    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 300;
    timerRunning = true; // 🔁 Reset flag
    document.getElementById('current-score').textContent = `Your score: ${score}`;
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('progressBar').classList.remove('hidden');
    document.getElementById('choices').classList.remove('hidden');
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('restart-btn').classList.add('hidden');

    loadQuestion();
    startTimer();
});

