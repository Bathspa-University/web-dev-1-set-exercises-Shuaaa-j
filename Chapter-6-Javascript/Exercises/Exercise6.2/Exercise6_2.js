// Array of colors in RGB format
const colors = [
    { r: 255, g: 0, b: 0 },     // Red
    { r: 255, g: 127, b: 0 },   // Orange
    { r: 255, g: 255, b: 0 },   // Yellow
    { r: 0, g: 255, b: 0 },     // Green
    { r: 0, g: 0, b: 255 },     // Blue
    { r: 75, g: 0, b: 130 },    // Indigo
    { r: 148, g: 0, b: 211 }    // Violet
];

let score = 0; // Current score
let lives = 3; // Number of lives
let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from local storage, default to 0 if not found

// Function to update the high score
function updateHighScore(newScore) {
    highScore = Math.max(highScore, newScore); // Update high score if the new score is higher
    localStorage.setItem('highScore', highScore); // Save high score to local storage
}

// Function to check for score rewards
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

// Function to check the selected color against the correct color
function checkAnswer(selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        score++; // Increase score if the answer is correct
        showMessage("Correct!", "green");
    } else {
        lives--; // Decrease lives if the answer is incorrect
        showMessage("Incorrect! Try Again", "red");
    }
    updateScore(); // Update score on the UI
    updateHighScore(score); // Update high score
    checkScoreRewards(score); // Check for score rewards
    if (lives === 0) {
        endGame(); // End the game if no lives left
    } else {
        startNewRound(); // Start a new round
    }
}

// Function to update score on the UI
function updateScore() {
    document.getElementById("score-value").textContent = score;
}

// Function to show message to the user
function showMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
}

// Function to start a new round
function startNewRound() {
    const correctColor = getRandomColor(); // Get random correct color
    const rgbDisplay = document.getElementById("rgb");
    rgbDisplay.textContent = generateRGBString(correctColor); // Display the RGB color string
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ''; // Clear previous options
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

// Function to end the game
function endGame() {
    showMessage(`Game Over! Final Score: ${score}`, "black");
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", function() {
        restartGame();
    });
}

// Function to restart the game
function restartGame() {
    score = 0;
    lives = 3;
    updateScore();
    startNewRound();
    document.getElementById("restart-btn").style.display = "none";
}

// Function to update the high score UI
function updateHighScoreUI() {
    document.getElementById("high-score-value").textContent = highScore;
}

// Initialize the game
updateHighScoreUI(); // Update high score UI when the game starts
startNewRound(); // Start the initial round

// Flag to track if the game is over
let gameOver = false;

// Function to disable color options
function disableColorOptions() {
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.removeEventListener("click", option.clickEvent);
        option.style.pointerEvents = "none";
    });
}

// Function to disable the restart button
function disableRestartButton() {
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.removeEventListener("click", restartBtn.clickEvent);
    restartBtn.style.pointerEvents = "none";
}

// Function to enable color options
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

// Function to enable the restart button
function enableRestartButton() {
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.clickEvent = function() {
        restartGame();
    };
    restartBtn.addEventListener("click", restartBtn.clickEvent);
    restartBtn.style.pointerEvents = "auto";
}

// Function to end the game
function endGame() {
    showMessage(`Game Over! Final Score: ${score}`, "black");
    disableColorOptions();
    disableRestartButton();
    gameOver = true;
    enableRestartButton(); // Enable restart button even after the game ends
}

// Function to restart the game
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
