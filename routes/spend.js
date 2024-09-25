const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { points } = req.body;
    let response = {};

    // Check if there are enough total points to spend
    if (global.total - points < 0) {
        res.status(400).send('Insufficient funds');
        return;
    } else {
        global.total -= points;  // Deduct the points from the total
        let spendPoints = points;

        // Spend points from the oldest transaction first
        while (spendPoints > 0 && global.transactionHeap.size() > 0) {
            const transaction = global.transactionHeap.peek();  // Get the oldest transaction
            const transactionPoints = transaction.points;

            if (transactionPoints >= spendPoints) {
                transaction.points -= spendPoints;

                // Check if the payer already exists in the response object
                if (response[transaction.payer]) {
                    response[transaction.payer] -= spendPoints;
                } else {
                    response[transaction.payer] = -spendPoints;
                }

                // If the transaction still has points left, keep it in the heap
                if (transaction.points > 0) {
                    global.transactionHeap.pop();  // Remove the outdated transaction
                    global.transactionHeap.push(transaction);  // Reinsert it with updated points
                }

                spendPoints = 0;  // All points have been spent
            } else {
                // Spend all points from this transaction and remove it
                if (response[transaction.payer]) {
                    response[transaction.payer] -= transactionPoints;
                } else {
                    response[transaction.payer] = -transactionPoints;
                }
                global.transactionHeap.pop();  // Remove the transaction
                spendPoints -= transactionPoints;  // Update remaining points to spend
            }
        }

        // Print remaining transactions in the heap for debugging
        console.log(global.transactionHeap.toArray());

        // Return the spent points summary
        res.status(200).json(response);
    }
});

module.exports = router;