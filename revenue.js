const revenueInput = document.getElementById('revenueInput');
const addButton = document.getElementById('addButton');
const revenueList = document.getElementById('revenueList');

let revenues = JSON.parse(localStorage.getItem('revenues')) || [];

function addRevenue() {
    const amount = parseFloat(revenueInput.value);
    if (!isNaN(amount)) {
        const date = new Date().toLocaleString();

        if(amount >= 4.7) {
            const userChoice = window.confirm("Amount is 4.7 or greater. Do you want to treat the rest as revenue?");

            if(userChoice) {
                revenues.push({ date, amount });
            } else {
                revenues.push({ date, amount: 0, savings: amount }); // Treat as no revenue and save the whole amount.
            }

        } else {
            revenues.push({ date, amount });
        }

        localStorage.setItem('revenues', JSON.stringify(revenues));
        revenueInput.value = '';
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
        } else if (revenue.savings !== undefined){
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
            revenues.splice(index, 1);
            localStorage.setItem('revenues', JSON.stringify(revenues));
            renderRevenues();
        });
        li.appendChild(deleteButton);

        revenueList.appendChild(li);
    });
}

addButton.addEventListener('click', addRevenue);

renderRevenues();