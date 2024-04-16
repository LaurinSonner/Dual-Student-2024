document.addEventListener('DOMContentLoaded', function () {
    let customersData = [];
    let filteredData = [];
    let salesChart;

    const fetchData = () => {
        fetch('/customers')
            .then(response => response.json())
            .then(data => {
                customersData = data;
                filteredData = [...customersData];
                renderTable();
                renderCharts();
            });
    };

    const renderTable = () => {
        const tableBody = document.getElementById('customerTableBody');
        tableBody.innerHTML = '';
        filteredData.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.customer_id}</td>
                <td>${customer.first_name}</td>
                <td>${customer.last_name}</td>
                <td>${customer.company}</td>
                <td>${customer.city}</td>
                <td>${customer.country}</td>
                <td>${customer.phone1}</td>
                <td>${customer.phone2}</td>
                <td>${customer.email}</td>
                <td>${customer.subscription_date}</td>
                <td>${customer.website}</td>
                <td>${customer.sales_2021}</td>
                <td>${customer.sales_2022}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    const renderCharts = () => {
        const totalSales2021 = customersData.reduce((acc, customer) => acc + customer.sales_2021, 0);
        const totalSales2022 = customersData.reduce((acc, customer) => acc + customer.sales_2022, 0);
        
        const salesData = [
            {
                label: 'Sales 2021',
                value: totalSales2021 / (totalSales2021 + totalSales2022) * 100, // Prozentualer Anteil der Verkäufe 2021
                backgroundColor: '#FF6384'
            },
            {
                label: 'Sales 2022',
                value: totalSales2022 / (totalSales2021 + totalSales2022) * 100, // Prozentualer Anteil der Verkäufe 2022
                backgroundColor: '#36A2EB'
            }
        ];
        
        const salesChartConfig = {
            type: 'pie',
            data: {
                labels: salesData.map(item => item.label),
                datasets: [{
                    data: salesData.map(item => item.value),
                    backgroundColor: salesData.map(item => item.backgroundColor)
                }]
            }
        };

        if (salesChart) {
            salesChart.destroy();
        }

        const salesChartCanvas = document.getElementById('salesChart').getContext('2d');
        salesChart = new Chart(salesChartCanvas, salesChartConfig);
    };

    const sortData = (columnIndex, asc) => {
        const columnKey = Object.keys(filteredData[0])[columnIndex];
        filteredData.sort((a, b) => {
            const valueA = a[columnKey];
            const valueB = b[columnKey];
            if (asc) {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
        renderTable();
    };

    const applyFilters = () => {
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        let minSales2021 = parseInt(document.getElementById('minSales2021').value);
        let minSales2022 = parseInt(document.getElementById('minSales2022').value);

        filteredData = customersData.filter(customer => {
            const subscriptionDate = new Date(customer.subscription_date);
            return (!startDate || startDate === 'TT.MM.JJJJ' || subscriptionDate >= new Date(startDate)) &&
                   (!endDate || endDate === 'TT.MM.JJJJ' || subscriptionDate <= new Date(endDate)) &&
                   (!minSales2021 || customer.sales_2021 >= minSales2021) &&
                   (!minSales2022 || customer.sales_2022 >= minSales2022);
        });
        renderTable();
        renderCharts();
    };

    const applyFiltersButton = document.getElementById('applyFiltersButton');
    applyFiltersButton.addEventListener('click', () => {
        applyFilters();
        sortData(0, true);
    });

    // Event-Listener für das Klicken auf Spaltenköpfe zur Sortierung
    document.querySelectorAll('th').forEach((header, index) => {
        header.addEventListener('click', () => {
            const isAscending = header.getAttribute('data-asc') === 'true';
            sortData(index, !isAscending);
            // Ändere den Pfeil zur Anzeige der Sortierrichtung
            document.querySelectorAll('th').forEach(th => th.removeAttribute('data-asc'));
            header.setAttribute('data-asc', !isAscending);
        });
    });

    fetchData();
});
