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
  
  const soundboard = document.querySelector('.soundboard');
  const textToSpeechInput = document.getElementById('text-to-speech-input');
  const textToSpeechButton = document.getElementById('text-to-speech-button');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  
  const samplesPerPage = 9;
  let currentPage = 0;
  
  function displaySamples() {
    soundboard.innerHTML = '';
    const startIndex = currentPage * samplesPerPage;
    const endIndex = Math.min(startIndex + samplesPerPage, audioSamples.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const sample = audioSamples[i];
      const button = document.createElement('button');
      button.textContent = `${sample.name} (${sample.duration}s)`;
      button.onclick = () => playAudio(sample.file);
      soundboard.appendChild(button);
    }
  
    updatePaginationButtons();
  }
  
  function playAudio(filename) {
    const audio = new Audio(`${filename}`);  
    audio.play();
  }
  
  function updatePaginationButtons() {
    prevPageButton.classList.toggle('hidden', currentPage === 0);
    nextPageButton.classList.toggle('hidden', currentPage === Math.ceil(audioSamples.length / samplesPerPage) - 1);
  }
  
  prevPageButton.addEventListener('click', () => {
    currentPage = Math.max(0, currentPage - 1);
    displaySamples();
  });
  
  nextPageButton.addEventListener('click', () => {
    currentPage = Math.min(currentPage + 1, Math.ceil(audioSamples.length / samplesPerPage) - 1);
    displaySamples();
  });
  
  textToSpeechButton.addEventListener('click', () => {
    const text = textToSpeechInput.value.trim();
    if (text !== '') {
      convertTextToSpeech(text);
    }
  });
  
  function convertTextToSpeech(text) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }