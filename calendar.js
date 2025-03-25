const calendarDiv = document.getElementById('calendar');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function createCalendar(year) {
    calendarDiv.innerHTML = '';
    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        monthDiv.innerHTML = `<h3>${monthName} ${year}</h3>`;

        const table = document.createElement('table');
        let day = 1;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = getDaysInMonth(year, month);

        let tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const th = document.createElement('th');
            th.textContent = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
            tr.appendChild(th);
        }
        table.appendChild(tr);

        let week = 0;
        for (let i = 0; i < 6; i++) {
            tr = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');
                if (week === 0 && j < firstDay) {
                    td.textContent = '';
                } else if (day <= daysInMonth) {
                    td.textContent = day;
                    td.dataset.date = `${year}-${month + 1}-${day}`;
                    td.addEventListener('click', toggleCellColor);
                    day++;
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
            if (day > daysInMonth) break;
            week++;
        }
        monthDiv.appendChild(table);
        calendarDiv.appendChild(monthDiv);
    }
    // Apply initial red color after cells are created.
    const allCells = document.querySelectorAll('td[data-date]');
    allCells.forEach(cell => {
        if (!localStorage.getItem(cell.dataset.date)) { // Check if not already in local storage
            cell.classList.add('red');
            localStorage.setItem(cell.dataset.date, 'red');
        }
    });

    loadCellColors(); // Load stored colors.
}

function toggleCellColor(event) {
    const cell = event.target;
    const date = cell.dataset.date;
    if (cell.classList.contains('green')) {
        cell.classList.remove('green');
        cell.classList.add('red');
        localStorage.setItem(date, 'red');
    } else if (cell.classList.contains('red')) {
        cell.classList.remove('red');
        cell.classList.add('green');
        localStorage.setItem(date, 'green');
    }
}

function loadCellColors() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(currentYear)) {
            const color = localStorage.getItem(key);
            const cell = document.querySelector(`[data-date="${key}"]`);
            if (cell) {
                cell.classList.add(color);
            }
        }
    }
}

createCalendar(currentYear);