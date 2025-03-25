let hours = parseInt(localStorage.getItem('hours')) || 3;
let minutes = parseInt(localStorage.getItem('minutes')) || 0;
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let timerInterval;

let timerStartTime = parseInt(localStorage.getItem('timerStartTime')) || 0;
let systemStartTime = parseInt(localStorage.getItem('systemStartTime')) || 0;
let remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  localStorage.setItem('hours', hours);
  localStorage.setItem('minutes', minutes);
  localStorage.setItem('seconds', seconds);
  localStorage.setItem('timerStartTime', timerStartTime);
  localStorage.setItem('systemStartTime', systemStartTime);
  localStorage.setItem('remainingTime', remainingTime);
}

function startTimer() {
  if (!timerStartTime) {
    timerStartTime = Date.now();
    systemStartTime = Date.now();
  }

  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - timerStartTime;
    remainingTime = parseInt(localStorage.getItem('remainingTime')) - elapsedTime;

    if (remainingTime <= 0) {
      hours = 3;
      minutes = 0;
      seconds = 0;
      timerStartTime = Date.now();
      systemStartTime = Date.now();
      remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    } else {
      hours = Math.floor(remainingTime / 3600000);
      minutes = Math.floor((remainingTime % 3600000) / 60000);
      seconds = Math.floor((remainingTime % 60000) / 1000);
    }

    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function addHours(amount) {
  hours = (hours + amount) % 24;
  remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  updateTimerDisplay();
}

function subtractHours(amount) {
  hours = (hours - amount + 24) % 24;
  remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  updateTimerDisplay();
}

function addMinutes(amount) {
  minutes = (minutes + amount) % 60;
  remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  updateTimerDisplay();
}

function subtractMinutes(amount) {
  minutes = (minutes - amount + 60) % 60;
  remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  updateTimerDisplay();
}

function addSeconds(amount) {
  seconds = (seconds + amount) % 60;
  remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  updateTimerDisplay();
}

function subtractSeconds(amount) {
  seconds = (seconds - amount + 60) % 60;
  remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  updateTimerDisplay();
}

document.getElementById('addHour').addEventListener('click', () => addHours(1));
document.getElementById('subHour').addEventListener('click', () => subtractHours(1));
document.getElementById('addMinute').addEventListener('click', () => addMinutes(1));
document.getElementById('subMinute').addEventListener('click', () => subtractMinutes(1));
document.getElementById('addSecond').addEventListener('click', () => addSeconds(1));
document.getElementById('subSecond').addEventListener('click', () => subtractSeconds(1));

function resumeTimer() {
  if (timerStartTime && systemStartTime) {
    const currentSystemTime = Date.now();
    const systemTimeDifference = currentSystemTime - systemStartTime;
    const adjustedTimerStartTime = timerStartTime + systemTimeDifference;
    const elapsedTime = currentSystemTime - adjustedTimerStartTime;
    let savedRemainingTime = parseInt(localStorage.getItem('remainingTime'));
    if (isNaN(savedRemainingTime)) {
      savedRemainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    }
    remainingTime = savedRemainingTime - elapsedTime;

    if (remainingTime > 0) {
      hours = Math.floor(remainingTime / 3600000);
      minutes = Math.floor((remainingTime % 3600000) / 60000);
      seconds = Math.floor((remainingTime % 60000) / 1000);
    } else if (savedRemainingTime > 0) {
      hours = 3;
      minutes = 0;
      seconds = 0;
      timerStartTime = Date.now();
      systemStartTime = Date.now();
      remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    } else {
      remainingTime = savedRemainingTime;
    }
  }
  updateTimerDisplay();
  startTimer();
}

resumeTimer();