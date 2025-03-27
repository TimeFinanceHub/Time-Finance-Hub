const revenueInput = document.getElementById('revenueInput');
const revenueDateInput = document.getElementById('revenueDateInput'); // Added date input
const addButton = document.getElementById('addButton');
const revenueList = document.getElementById('revenueList');

let revenues = JSON.parse(localStorage.getItem('revenues')) || [];
let editingIndex = -1;

function addRevenue() {
    const amount = parseFloat(revenueInput.value);
    const date = revenueDateInput.value ? new Date(revenueDateInput.value).toLocaleString() : new Date().toLocaleString(); // Use input date or current date

    if (!isNaN(amount)) {
        if (amount >= 4.7) {
            const userChoice = window.confirm("Amount is 4.7 or greater. Do you want to treat the rest as revenue?");
            if (userChoice) {
                revenues.push({ date, amount });
            } else {
                revenues.push({ date, amount: 0, savings: amount });
            }
        } else {
            revenues.push({ date, amount });
        }
        localStorage.setItem('revenues', JSON.stringify(revenues));
        revenueInput.value = '';
        revenueDateInput.value = '';
        renderRevenues();
    }
}

function renderRevenues() {
    revenueList.innerHTML = '';
    revenues.forEach((revenue, index) => {
        const li = document.createElement('li');
        let savings = 0;
        let revenueAmount = 0;
        let labels = [];

        if (revenue.amount > 4.6) {
            savings = 4.6;
            revenueAmount = revenue.amount - 4.6;
            labels.push('Savings: $' + savings.toFixed(2));
            labels.push('Revenue: $' + revenueAmount.toFixed(2));
        } else if (revenue.savings !== undefined) {
            savings = revenue.savings;
            labels.push('Savings: $' + savings.toFixed(2));
            labels.push('Not Revenue');
        } else {
            savings = revenue.amount;
            labels.push('Savings: $' + savings.toFixed(2));
            labels.push('Not Revenue');
        }

        li.textContent = `${revenue.date} - ${labels.join(', ')}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteRevenue(index);
        });
        li.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editRevenue(index);
        });
        li.appendChild(editButton);

        revenueList.appendChild(li);
    });
}

function deleteRevenue(index) {
    revenues.splice(index, 1);
    localStorage.setItem('revenues', JSON.stringify(revenues));
    renderRevenues();
}

function editRevenue(index) {
    editingIndex = index;
    revenueInput.value = revenues[index].amount;
    revenueDateInput.value = new Date(revenues[index].date).toISOString().slice(0, 16); // Populate date input
    addButton.textContent = 'Save Edit';

    addButton.removeEventListener('click', addRevenue);
    addButton.addEventListener('click', saveEdit);
}

function saveEdit() {
    const amount = parseFloat(revenueInput.value);
    const date = revenueDateInput.value ? new Date(revenueDateInput.value).toLocaleString() : new Date().toLocaleString();

    if (!isNaN(amount)) {
        revenues[editingIndex].amount = amount;
        revenues[editingIndex].date = date;
        localStorage.setItem('revenues', JSON.stringify(revenues));
        revenueInput.value = '';
        revenueDateInput.value = '';
        renderRevenues();
        addButton.textContent = 'Add Revenue';
        addButton.removeEventListener('click', saveEdit);
        addButton.addEventListener('click', addRevenue);
        editingIndex = -1;
    }
}

addButton.addEventListener('click', addRevenue);

renderRevenues();