// Define an array of audio samples with their names, file paths, and durations
const audioSamples = [
  { name: "Ah-ha!", file: "ah-ha.mp3", duration: 3 },
  { name: "Back of the net!", file: "back-of-the-net.mp3", duration: 4 },
  { name: "Bang out of order!", file: "bangoutoforder.mp3", duration: 4 },
  { name: "Email of the evening!", file: "emailoftheevening.mp3", duration: 5 },
  { name: "Hello Partridge!", file: "hellopartridge.mp3", duration: 3 },
  { name: "I ate a Scotch egg!", file: "iateascotchegg.mp3", duration: 5 },
  { name: "I'm confused!", file: "imconfused.mp3", duration: 3 },
  { name: "Dan!", file: "dan.mp3", duration: 2 }
];

// Get reference to the soundboard container, text input, buttons, and pagination buttons
const soundboard = document.querySelector('.soundboard');
const textToSpeechInput = document.getElementById('text-to-speech-input');
const textToSpeechButton = document.getElementById('text-to-speech-button');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

// Define the number of samples to display per page and initialize the current page
const samplesPerPage = 9;
let currentPage = 0;

// Function to display the audio samples on the soundboard
function displaySamples() {
  soundboard.innerHTML = ''; // Clear previous content
  const startIndex = currentPage * samplesPerPage;
  const endIndex = Math.min(startIndex + samplesPerPage, audioSamples.length);

  // Loop through the audio samples to create buttons and add them to the soundboard
  for (let i = startIndex; i < endIndex; i++) {
    const sample = audioSamples[i];
    const button = document.createElement('button');
    button.textContent = `${sample.name} (${sample.duration}s)`;
    button.onclick = () => playAudio(sample.file); // Set onclick event to play audio
    soundboard.appendChild(button);
  }

  updatePaginationButtons(); // Update pagination buttons visibility
}

// Function to play audio given a file path
function playAudio(filename) {
  const audio = new Audio(`${filename}`); // Create new Audio object
  audio.play(); // Play the audio
}

// Function to update the visibility of pagination buttons based on current page
function updatePaginationButtons() {
  prevPageButton.classList.toggle('hidden', currentPage === 0); // Hide prev button on first page
  nextPageButton.classList.toggle('hidden', currentPage === Math.ceil(audioSamples.length / samplesPerPage) - 1); // Hide next button on last page
}

// Event listener for previous page button click
prevPageButton.addEventListener('click', () => {
  currentPage = Math.max(0, currentPage - 1); // Decrease current page if not already on first page
  displaySamples(); // Display samples for updated page
});

// Event listener for next page button click
nextPageButton.addEventListener('click', () => {
  currentPage = Math.min(currentPage + 1, Math.ceil(audioSamples.length / samplesPerPage) - 1); // Increase current page if not already on last page
  displaySamples(); // Display samples for updated page
});

// Event listener for text-to-speech button click
textToSpeechButton.addEventListener('click', () => {
  const text = textToSpeechInput.value.trim();
  if (text !== '') {
    convertTextToSpeech(text); // Convert entered text to speech
  }
});

// Function to convert text to speech using Web Speech API
function convertTextToSpeech(text) {
  const speechSynthesis = window.speechSynthesis; // Get speech synthesis object
  const utterance = new SpeechSynthesisUtterance(text); // Create utterance with entered text
  speechSynthesis.speak(utterance); // Speak the utterance
}
