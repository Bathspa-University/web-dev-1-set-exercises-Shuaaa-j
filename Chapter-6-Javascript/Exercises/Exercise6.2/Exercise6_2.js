const colors = [
    { r: 255, g: 0, b: 0 },     // Red
    { r: 255, g: 127, b: 0 },   // Orange
    { r: 255, g: 255, b: 0 },   // Yellow
    { r: 0, g: 255, b: 0 },     // Green
    { r: 0, g: 0, b: 255 },     // Blue
    { r: 75, g: 0, b: 130 },    // Indigo
    { r: 148, g: 0, b: 211 }    // Violet
];

let score = 0;
let lives = 3;
let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from local storage

function updateHighScore(newScore) {
    highScore = Math.max(highScore, newScore); // Update high score if the new score is higher
    localStorage.setItem('highScore', highScore); // Save high score to local storage
}

function checkScoreRewards(score) {
    if (score % 10 === 0 && score > 0) {
        showMessage(`Congratulations! You've reached a score of ${score}!`, "blue");
        // Add any rewards or special messages here
    }
}

// Get random RGB color
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate random RGB string
function generateRGBString(color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function checkAnswer(selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        score++;
        showMessage("Correct!", "green");
    } else {
        lives--;
        showMessage("Incorrect! Try Again", "red");
    }
    updateScore();
    updateHighScore(score); // Update high score
    checkScoreRewards(score); // Check for score rewards
    if (lives === 0) {
        endGame();
    } else {
        startNewRound();
    }
}

// Update score on the UI
function updateScore() {
    document.getElementById("score-value").textContent = score;
}

// Show message to the user
function showMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
}

// Start a new round
function startNewRound() {
    const correctColor = getRandomColor();
    const rgbDisplay = document.getElementById("rgb");
    rgbDisplay.textContent = generateRGBString(correctColor);
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';
    colors.forEach(color => {
        const option = document.createElement("div");
        option.classList.add("option");
        option.style.backgroundColor = generateRGBString(color);
        option.addEventListener("click", function() {
            checkAnswer(generateRGBString(color), generateRGBString(correctColor));
        });
        optionsContainer.appendChild(option);
    });
}

// End the game
function endGame() {
    showMessage(`Game Over! Final Score: ${score}`, "black");
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", function() {
        restartGame();
    });
}

// Restart the game
function restartGame() {
    score = 0;
    lives = 3;
    updateScore();
    startNewRound();
    document.getElementById("restart-btn").style.display = "none";
}

// Start the initial round
startNewRound();

function updateHighScoreUI() {
    document.getElementById("high-score-value").textContent = highScore;
}

updateHighScoreUI(); // Update high score UI when the game starts
startNewRound();

// Add a flag to track if the game is over
let gameOver = false;

// Disable color options
function disableColorOptions() {
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.removeEventListener("click", option.clickEvent);
        option.style.pointerEvents = "none";
    });
}

// Disable restart button
function disableRestartButton() {
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.removeEventListener("click", restartBtn.clickEvent);
    restartBtn.style.pointerEvents = "none";
}

// Enable color options
function enableColorOptions() {
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.clickEvent = function() {
            checkAnswer(generateRGBString(this.color), generateRGBString(correctColor));
        };
        option.addEventListener("click", option.clickEvent);
        option.style.pointerEvents = "auto";
    });
}

// Enable restart button
function enableRestartButton() {
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.clickEvent = function() {
        restartGame();
    };
    restartBtn.addEventListener("click", restartBtn.clickEvent);
    restartBtn.style.pointerEvents = "auto";
}

function endGame() {
    showMessage(`Game Over! Final Score: ${score}`, "black");
    disableColorOptions();
    disableRestartButton();
    gameOver = true;
    enableRestartButton(); // Enable restart button even after the game ends
}

function restartGame() {
    if (gameOver) {
        gameOver = false;
        score = 0;
        lives = 3;
        updateScore();
        updateHighScoreUI();
        startNewRound();
        enableColorOptions();
        showMessage("", "black");
    }
}
