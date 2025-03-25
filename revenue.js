const revenueInput = document.getElementById('revenueInput');
const addButton = document.getElementById('addButton');
const revenueList = document.getElementById('revenueList');

let revenues = JSON.parse(localStorage.getItem('revenues')) || [];

function renderRevenues() {
    revenueList.innerHTML = '';
    revenues.forEach((revenue, index) => {
        const li = document.createElement('li');
        let savings = 0;
        let revenueAmount = 0;
        let labels = [];

        if (revenue.amount > 5) {
            savings = 5;
            revenueAmount = revenue.amount - 5;
            labels.push('Savings: $' + savings);
            labels.push('Revenue: $' + revenueAmount);
        } else {
            savings = revenue.amount;
            labels.push('Savings: $' + savings);
            labels.push('Not Revenue');
        }

        li.textContent = `${revenue.date} - ${labels.join(', ')}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            revenues.splice(index, 1);
            localStorage.setItem('revenues', JSON.stringify(revenues));
            renderRevenues();
        });
        li.appendChild(deleteButton);

        revenueList.appendChild(li);
    });
}

function addRevenue() {
    const amount = parseFloat(revenueInput.value);
    if (!isNaN(amount)) {
        const date = new Date().toLocaleString();
        revenues.push({ date, amount });
        localStorage.setItem('revenues', JSON.stringify(revenues));
        revenueInput.value = '';
        renderRevenues();
    }
}

addButton.addEventListener('click', addRevenue);

renderRevenues();