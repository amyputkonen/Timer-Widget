const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const minutesInput = document.getElementById('minutes');
const timeDisplay = document.getElementById('time-display');
const soundToggle = document.getElementById('sound-toggle');
const alertSound = new Audio('531022__creeeeak__bell15.wav');


let timerInterval;
let remainingTime = 0;

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  const minutes = parseInt(minutesInput.value, 10);
  if (isNaN(minutes) || minutes <= 0) {
    alert('Please enter a valid number of minutes.');
    return;
  }

  remainingTime = minutes * 60;
  updateDisplay();

  startButton.disabled = true;
  resetButton.disabled = false;
  minutesInput.disabled = true;

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      if (soundToggle.checked) {
        alertSound.play();
      }
      alert('Time’s up!');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  updateDisplay();

  startButton.disabled = false;
  resetButton.disabled = true;
  minutesInput.disabled = false;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
