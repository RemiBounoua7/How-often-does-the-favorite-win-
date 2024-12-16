// Path to the CSV file
const csvFilePath = 'Favorites table.csv';


// Function to preprocess CSV data
function preprocessCSV(csvText) {
    // Match rows while preserving lists (e.g., ["A","B"])
    const regex = /(".*?"|[^",]+)(?=,|$)/g;
    return csvText.split('\n').map(line => {
        const matches = [...line.matchAll(regex)].map(match => match[0].trim());
        return matches.map(cell => {
            // Remove surrounding quotes if present
            return cell.startsWith('"') && cell.endsWith('"') ? cell.slice(1, -1) : cell;
        });
    });
}


// Function to fetch and parse CSV
async function loadCSV() {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();

    // Preprocess CSV to handle lists correctly
    const rows = preprocessCSV(csvText);

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

            // Highlight cells if Method N was right on year X
            if (colIndex >= 3 && row[2].trim() && td.textContent.includes(row[2].trim())) {
                td.classList.add('highlight');
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

// Load the CSV and populate the table on page load
window.onload = loadCSV;
