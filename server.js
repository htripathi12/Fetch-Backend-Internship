const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Import routes
const add = require('./routes/add');
const spend = require('./routes/spend');
const balance = require('./routes/balance');

// Define Middleware
app.use(express.json());

// Use router for each route
app.use('/add', add);
app.use('/spend', spend);
app.use('/balance', balance);

app.listen(PORT, () => {
    console.log('Server started on http://localhost:8000');
});