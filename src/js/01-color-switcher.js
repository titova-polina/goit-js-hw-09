const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId;

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function onStart() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
}

function onStop() {
  clearInterval(intervalId);
  intervalId = null;

  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);
