const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { payer, points, timestamp } = req.body;
    total += points;
    global.transactionHeap.push({ payer, points, timestamp });
    console.log(global.transactionHeap);
    res.status(200).send(total.toString());
});

module.exports = router;