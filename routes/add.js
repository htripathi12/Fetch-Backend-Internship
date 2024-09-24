const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { payer, points, timestamp } = req.body;
    global.total += points;
    global.transactionHeap.push({ payer, points, timestamp });
    console.log(global.transactionHeap.toArray());
    res.status(200).send(global.total.toString());
});

module.exports = router;