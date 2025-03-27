// Level Calculator Section
const gameNameInput = document.getElementById('gameNameInput');
const coinGoalInput = document.getElementById('coinGoalInput');
const coinPerLevelInput = document.getElementById('coinPerLevelInput');
const calculateButton = document.getElementById('calculateButton');
const calculationList = document.getElementById('calculationList');

// Added elements for new functionality
const startingCoinsInput = document.createElement('input');
startingCoinsInput.type = 'number';
startingCoinsInput.placeholder = 'Starting Coins';
const endingCoinsInput = document.createElement('input');
endingCoinsInput.type = 'number';
endingCoinsInput.placeholder = 'Ending Coins';
const calculatePlayedLevelsButton = document.createElement('button');
calculatePlayedLevelsButton.textContent = 'Calculate Played Levels';
const playedLevelsDisplay = document.createElement('div');

let calculations = JSON.parse(localStorage.getItem('calculations')) || [];

// Append new elements to the calculator section
const calculatorDiv = document.querySelector('#calculationList').parentElement;
calculatorDiv.appendChild(startingCoinsInput);
calculatorDiv.appendChild(endingCoinsInput);
calculatorDiv.appendChild(calculatePlayedLevelsButton);
calculatorDiv.appendChild(playedLevelsDisplay);

function calculateLevels() {
    const gameName = gameNameInput.value;
    const coinGoal = parseFloat(coinGoalInput.value);
    const coinPerLevel = parseFloat(coinPerLevelInput.value);

    if (gameName && !isNaN(coinGoal) && !isNaN(coinPerLevel) && coinPerLevel !== 0) {
        const levelsNeeded = Math.ceil(coinGoal / coinPerLevel);
        calculations.push({ gameName, coinGoal, coinPerLevel, levelsNeeded });
        localStorage.setItem('calculations', JSON.stringify(calculations));
        renderCalculations();
        gameNameInput.value = '';
        coinGoalInput.value = '';
        coinPerLevelInput.value = '';
    }
}

function calculatePlayedLevels() {
    const startingCoins = parseFloat(startingCoinsInput.value);
    const endingCoins = parseFloat(endingCoinsInput.value);
    const coinPerLevel = parseFloat(coinPerLevelInput.value);

    if (!isNaN(startingCoins) && !isNaN(endingCoins) && !isNaN(coinPerLevel) && coinPerLevel !== 0) {
        const coinsEarned = endingCoins - startingCoins;
        const levelsPlayed = Math.floor(coinsEarned / coinPerLevel);
        playedLevelsDisplay.textContent = `Levels Played: ${levelsPlayed}`;
    } else {
        playedLevelsDisplay.textContent = 'Invalid input';
    }
}

function renderCalculations() {
    calculationList.innerHTML = '';
    calculations.forEach((calc, index) => {
        const li = document.createElement('li');
        li.textContent = `Game: ${calc.gameName}, Goal: ${calc.coinGoal}, Coins/Level: ${calc.coinPerLevel}, Levels Needed: ${calc.levelsNeeded}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteCalculation(index);
        });
        li.appendChild(deleteButton);

        calculationList.appendChild(li);
    });
}

function deleteCalculation(index) {
    calculations.splice(index, 1);
    localStorage.setItem('calculations', JSON.stringify(calculations));
    renderCalculations();
}

calculateButton.addEventListener('click', calculateLevels);
calculatePlayedLevelsButton.addEventListener('click', calculatePlayedLevels);

renderCalculations();