// Path to the CSV file
const csvFilePath = 'Favorites table.csv';

// Function to fetch and parse CSV
async function loadCSV() {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    const rows = csvText.split('\n').map(row => row.split(','));
    rows.shift();
    populateTable(rows);
}

// Function to populate table
function populateTable(data) {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach((row, rowIndex) => {
        if (row.length === 0 || row.every(cell => cell.trim() === '')) return; // Skip empty rows

        const tr = document.createElement('tr');

        row.slice(1).forEach((cell, colIndex) => {
            const td = document.createElement('td');
            td.textContent = cell;

            // Apply conditional formatting for columns 3 to 5
            if (colIndex >= 2 && cell === row[2]) {
                td.classList.add('highlight1');
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

// Load the CSV and populate the table on page load
window.onload = loadCSV;
