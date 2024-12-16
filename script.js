
// Path to the CSV file
const csvFilePath = 'Favorites table.csv';

// Function to fetch and parse CSV
async function loadCSV() {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    const rows = csvText.split('\n').map(row => row.split(','));

    // Remove the first row (header)
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

        // Skip the first column, iterate over the rest
        row.slice(1).forEach((cell, colIndex) => {
            const td = document.createElement('td');

            // Handle list or string display
            try {
                const parsedCell = JSON.parse(cell.trim());
                if (Array.isArray(parsedCell)) {
                    td.textContent = parsedCell.join(', '); // Display list as comma-separated
                } else {
                    td.textContent = parsedCell; // Display string/other values
                }
            } catch {
                td.textContent = cell.trim(); // If parsing fails, treat as plain string
            }

            // Highlight if columns contain the value from column 1
            if (colIndex >= 2 && row[0].trim() && td.textContent === row[0].trim()) {
                td.classList.add('highlight1');
            }
            else if (colIndex >= 2 && row[0].trim() && td.textContent.includes(row[0].trim())) {
                td.classList.add('highlight2');
            }


            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

// Load the CSV and populate the table on page load
window.onload = loadCSV;
