let hours = parseInt(localStorage.getItem('hours')) || 3;
let minutes = parseInt(localStorage.getItem('minutes')) || 0;
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let timerInterval;
const addHourButton = document.getElementById('addHour');

let timerStartTime = parseInt(localStorage.getItem('timerStartTime')) || 0;
let systemStartTime = parseInt(localStorage.getItem('systemStartTime')) || 0;

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    if (hours >= 3) {
        addHourButton.disabled = true;
        checkAndResetTimer();
    } else {
        addHourButton.disabled = false;
    }

    localStorage.setItem('hours', hours);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('timerStartTime', timerStartTime);
    localStorage.setItem('systemStartTime', systemStartTime);
}

function checkAndResetTimer() {
    if (hours >= 3 && addHourButton.disabled) {
        if (minutes !== 0 || seconds !== 0) {
            minutes = 0;
            seconds = 0;
            updateTimerDisplay();
        }
    }
}

function startTimer() {
    if (!timerStartTime) {
        timerStartTime = Date.now();
        systemStartTime = Date.now();
        localStorage.setItem('timerStartTime', timerStartTime);
        localStorage.setItem('systemStartTime', systemStartTime);
    }

    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - timerStartTime;
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        const remainingMilliseconds = totalMilliseconds - elapsedTime;

        if (remainingMilliseconds <= 0) {
            hours = 3;
            minutes = 0;
            seconds = 0;
            timerStartTime = Date.now();
            systemStartTime = Date.now();
        } else {
            hours = Math.floor(remainingMilliseconds / 3600000);
            minutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
            seconds = Math.floor((remainingMilliseconds % 60000) / 1000);
        }

        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function addHours(amount) {
    hours = (hours + amount) % 24;
    updateTimerDisplay();
}

function subtractHours(amount) {
    hours = (hours - amount + 24) % 24;
    updateTimerDisplay();
}

function addMinutes(amount) {
    minutes = (minutes + amount) % 60;
    updateTimerDisplay();
}

function subtractMinutes(amount) {
    minutes = (minutes - amount + 60) % 60;
    updateTimerDisplay();
}

function addSeconds(amount) {
    seconds = (seconds + amount) % 60;
    updateTimerDisplay();
}

function subtractSeconds(amount) {
    seconds = (seconds - amount + 60) % 60;
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
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        const remainingMilliseconds = totalMilliseconds - elapsedTime;

        if (remainingMilliseconds > 0) {
            hours = Math.floor(remainingMilliseconds / 3600000);
            minutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
            seconds = Math.floor((remainingMilliseconds % 60000) / 1000);
        } else {
            hours = 3;
            minutes = 0;
            seconds = 0;
            timerStartTime = Date.now();
            systemStartTime = Date.now();
        }
    }
    updateTimerDisplay();
    startTimer();
}

resumeTimer();