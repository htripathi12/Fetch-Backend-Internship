const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { payer, points, timestamp } = req.body;

    global.total += points;

    // Update the payer's balance in the global balances object
    if (global.balances[payer]) {
        global.balances[payer] += points;
    } else {
        global.balances[payer] = points; // Initialize payer balance if it doesn't exist
    }

    global.transactionHeap.push({ payer, points, timestamp });
    res.status(200).send();
});

module.exports = router;