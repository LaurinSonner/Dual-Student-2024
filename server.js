const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = 3000;

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/chart.js"]
    }
}));

app.use(express.static('public'));

app.get('/customers', (req, res) => {
    const db = new sqlite3.Database('customer_data.db');
    const sql = 'SELECT * FROM customers';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Setzen des MIME-Typs für JavaScript-Dateien
app.get('/index.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'index.js'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
