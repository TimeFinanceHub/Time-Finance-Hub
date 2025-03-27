const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('incrementButton');
const amountInput = document.getElementById('amountInput');
const addRecordButton = document.getElementById('addRecordButton');
const recordList = document.getElementById('recordList');
const incrementSelection = document.getElementById('incrementSelection');
const forceSaveButton = document.getElementById('forceSaveButton');
const amountInputDiv = document.getElementById('amountInputDiv');
const holdInput = document.createElement('input'); // Added hold input
const gameInput = document.createElement('input'); // Added game input
const gameLabel = document.createElement('label'); //game label
const holdLabel = document.createElement('label'); //hold label

let counter = parseInt(localStorage.getItem('counter')) || 0;
let records = JSON.parse(localStorage.getItem('records')) || [];

function updateCounterDisplay() {
    counterElement.textContent = counter;
    localStorage.setItem('counter', counter);

    if (counter >= 1000) {
        amountInputDiv.style.display = 'block';
        addRecordButton.style.display = 'block';
        incrementButton.disabled = true;

        // Append hold input and game input when the counter reaches 1000
        if (!document.getElementById('holdInput')) {
          holdInput.id = 'holdInput';
          holdInput.type = 'number';
          holdLabel.textContent = 'Hold:';
          holdLabel.htmlFor = 'holdInput';
          amountInputDiv.appendChild(holdLabel);
          amountInputDiv.appendChild(holdInput);
        }
        if(!document.getElementById('gameInput')) {
          gameInput.id = 'gameInput';
          gameInput.type = 'text';
          gameLabel.textContent = 'Game:';
          gameLabel.htmlFor = 'gameInput';
          amountInputDiv.appendChild(gameLabel);
          amountInputDiv.appendChild(gameInput);
        }

    } else {
        amountInputDiv.style.display = 'none';
        addRecordButton.style.display = 'none';
        incrementButton.disabled = false;
    }
}

function incrementCounter() {
    const selectedIncrement = parseInt(document.querySelector('input[name="incrementValue"]:checked').value);
    counter += selectedIncrement;
    updateCounterDisplay();
}

function addRecord() {
    let amount = parseFloat(amountInput.value);
    const hold = parseFloat(holdInput.value);
    const game = gameInput.value;

    if (!isNaN(amount)) {
        if (!isNaN(hold)) {
            amount -= hold;
        }

        records.push({ counter, amount, game }); // Include game in record
        localStorage.setItem('records', JSON.stringify(records));
        counter = 0;
        amountInput.value = '';
        holdInput.value = '';
        gameInput.value = '';
        updateCounterDisplay();
        renderRecords();
    }
}

function renderRecords() {
    recordList.innerHTML = '';
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `Counter: ${record.counter}, Amount: $${record.amount.toFixed(2)}, Game: ${record.game || 'N/A'}`; // Added dollar sign and game

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteRecord(index);
        });
        li.appendChild(deleteButton);

        recordList.appendChild(li);
    });
}

function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    renderRecords();
}

forceSaveButton.addEventListener('click', () => {
    if (window.confirm("Are you sure you want to save a record before reaching 1000?")) {
        amountInputDiv.style.display = 'block';
        if (!document.getElementById('holdInput')) {
          holdInput.id = 'holdInput';
          holdInput.type = 'number';
          holdLabel.textContent = 'Hold:';
          holdLabel.htmlFor = 'holdInput';
          amountInputDiv.appendChild(holdLabel);
          amountInputDiv.appendChild(holdInput);
        }
        if(!document.getElementById('gameInput')) {
          gameInput.id = 'gameInput';
          gameInput.type = 'text';
          gameLabel.textContent = 'Game:';
          gameLabel.htmlFor = 'gameInput';
          amountInputDiv.appendChild(gameLabel);
          amountInputDiv.appendChild(gameInput);
        }
        addRecord();
    }
});

incrementButton.addEventListener('click', incrementCounter);
addRecordButton.addEventListener('click', addRecord);

updateCounterDisplay();
renderRecords();