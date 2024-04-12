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

// Get random RGB color
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate random RGB string
function generateRGBString(color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

// Check if selected option is correct
function checkAnswer(selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        score++;
        showMessage("Correct!", "green");
    } else {
        lives--;
        showMessage("Incorrect! Try Again", "red");
    }
    updateScore();
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
