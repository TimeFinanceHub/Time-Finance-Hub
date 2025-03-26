const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('incrementButton');
const amountInput = document.getElementById('amountInput');
const addRecordButton = document.getElementById('addRecordButton');
const recordList = document.getElementById('recordList');
const incrementSelection = document.getElementById('incrementSelection'); // Get the increment selection div

let counter = parseInt(localStorage.getItem('counter')) || 0;
let records = JSON.parse(localStorage.getItem('records')) || [];

function updateCounterDisplay() {
    counterElement.textContent = counter;
    localStorage.setItem('counter', counter);

    if (counter >= 1000) {
        amountInput.style.display = 'block';
        addRecordButton.style.display = 'block';
        incrementButton.disabled = true;
    } else {
        amountInput.style.display = 'none';
        addRecordButton.style.display = 'none';
        incrementButton.disabled = false;
    }
}

function incrementCounter() {
    const selectedIncrement = parseInt(document.querySelector('input[name="incrementValue"]:checked').value); // Get selected increment
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

incrementButton.addEventListener('click', incrementCounter);
addRecordButton.addEventListener('click', addRecord);

updateCounterDisplay();
renderRecords();