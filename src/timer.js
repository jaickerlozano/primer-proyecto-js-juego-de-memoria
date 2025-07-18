let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  display.textContent = formatTime(diff);
}

export function startStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopButton.textContent = 'Iniciar';
  } else {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10); // Actualiza cada 10 ms
    startStopButton.textContent = 'Detener';
  }
  isRunning = !isRunning;
}

export function reset() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
}