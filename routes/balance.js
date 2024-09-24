const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const balances = {};

    global.transactionHeap.toArray().forEach(transaction => {
        if (!balances[transaction.payer]) {
            balances[transaction.payer] = 0;
        }
        balances[transaction.payer] += transaction.points;
    });

    res.status(200).json(balances);
});

module.exports = router;
