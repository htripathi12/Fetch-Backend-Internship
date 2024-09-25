const express = require('express');
const { Heap } = require('heap-js');

const app = express();
const PORT = process.env.PORT || 8000;

// Import routes
const add = require('./routes/add');
const spend = require('./routes/spend');
const balance = require('./routes/balance');

// Define Middleware
app.use(express.json());

// Create storage structures
global.total = 0;
global.transactionHeap = new Heap((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
global.balances = {};

// Use router for each route
app.use('/add', add);
app.use('/spend', spend);
app.use('/balance', balance);

app.use('/', (req, res) => {
    res.send('Welcome to the Points API');
});

app.listen(PORT, () => {
    console.log('Server started on http://localhost:8000');
});