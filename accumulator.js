const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('incrementButton');
const amountInput = document.getElementById('amountInput');
const addRecordButton = document.getElementById('addRecordButton');
const recordList = document.getElementById('recordList');
const incrementSelection = document.getElementById('incrementSelection');
const forceSaveButton = document.getElementById('forceSaveButton');
const amountInputDiv = document.getElementById('amountInputDiv');

let counter = parseInt(localStorage.getItem('counter')) || 0;
let records = JSON.parse(localStorage.getItem('records')) || [];

function updateCounterDisplay() {
    counterElement.textContent = counter;
    localStorage.setItem('counter', counter);

    if (counter >= 1000) {
        amountInputDiv.style.display = 'block';
        addRecordButton.style.display = 'block';
        incrementButton.disabled = true;
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
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount)) {
        records.push({ counter, amount });
        localStorage.setItem('records', JSON.stringify(records));
        counter = 0;
        amountInput.value = '';
        updateCounterDisplay();
        renderRecords();
    }
}

function renderRecords() {
    recordList.innerHTML = '';
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `Counter: ${record.counter}, Amount: ${record.amount}`;

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
        addRecord();
    }
});

incrementButton.addEventListener('click', incrementCounter);
addRecordButton.addEventListener('click', addRecord);

updateCounterDisplay();
renderRecords();