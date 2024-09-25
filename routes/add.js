const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { payer, points, timestamp } = req.body;
    global.total += points;
    if (global.balances[payer]) {
        global.balances[payer] += points;
    } else {
        global.balances[payer] = points;
    }
    global.transactionHeap.push({ payer, points, timestamp });
    res.status(200).send(global.total.toString());
});

module.exports = router;