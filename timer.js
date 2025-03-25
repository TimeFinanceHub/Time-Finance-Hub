let hours = parseInt(localStorage.getItem('hours')) || 3;
let minutes = parseInt(localStorage.getItem('minutes')) || 0;
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let timerInterval;
const addHourButton = document.getElementById('addHour');

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    if (hours >= 3) {
        addHourButton.disabled = true;
        checkAndResetTimer(); // Call reset when disabled
    } else {
        addHourButton.disabled = false;
    }

    // Save timer state to local storage
    localStorage.setItem('hours', hours);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
}

function checkAndResetTimer() {
    if (hours >= 3 && addHourButton.disabled) {
        if (minutes !== 0 || seconds !== 0) {
            minutes = 0;
            seconds = 0;
            updateTimerDisplay(); // Update display after reset
        }
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            hours = 3;
            minutes = 0;
            seconds = 0;
        } else {
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                }
            }
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

// Event listeners for buttons
document.getElementById('addHour').addEventListener('click', () => addHours(1));
document.getElementById('subHour').addEventListener('click', () => subtractHours(1));
document.getElementById('addMinute').addEventListener('click', () => addMinutes(1));
document.getElementById('subMinute').addEventListener('click', () => subtractMinutes(1));
document.getElementById('addSecond').addEventListener('click', () => addSeconds(1));
document.getElementById('subSecond').addEventListener('click', () => subtractSeconds(1));

// Initial setup
updateTimerDisplay();
startTimer();