const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { points } = req.body;
    let response = [];

    if (global.total - points < 0) {
        res.status(400).send('Insufficient funds');
        return;
    } else {
        global.total -= points;
        let spendPoints = points;
        while (spendPoints > 0 && global.transactionHeap.size() > 0) {
            const transaction = global.transactionHeap.peek();
            const transactionPoints = transaction.points;
            if (transactionPoints >= spendPoints) {
                transaction.points -= spendPoints;
                spendPoints = 0;
            } else {
                global.transactionHeap.pop();
                spendPoints -= transactionPoints;
            }
        }
    }
    console.log(global.transactionHeap.toArray());
    res.status(200).send(global.total.toString());
});

module.exports = router;