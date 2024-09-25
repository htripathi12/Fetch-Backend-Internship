const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { points } = req.body;
    let response = {};

    // Check if there are enough total points to spend
    if (global.total - points < 0) {
        return res.status(400).send('Insufficient funds');
    } else {
        global.total -= points; // Deduct points from the global total
        let spendPoints = points; // Initialize spendPoints with the points to spend

        // Spend points from the oldest transaction first
        while (spendPoints > 0 && global.transactionHeap.size() > 0) {
            const transaction = global.transactionHeap.peek();  // Get the oldest transaction
            console.log('Peeked transaction:', transaction);
            const transactionPoints = transaction.points;

            // If the transaction has enough points to cover the remaining spendPoints
            if (transactionPoints >= spendPoints) {
                transaction.points -= spendPoints;
                console.log(`Updated transaction points for ${transaction.payer}:`, transaction.points);

                // Add to response for payer
                if (response[transaction.payer]) {
                    response[transaction.payer] -= spendPoints;
                } else {
                    response[transaction.payer] = -spendPoints;
                }

                // Update the payer's balance in global.balances
                if (global.balances[transaction.payer]) {
                    global.balances[transaction.payer] -= spendPoints;
                } else {
                    global.balances[transaction.payer] = -spendPoints;
                }

                // Ensure that the payer's balance is tracked as 0 if all points are spent
                if (global.balances[transaction.payer] === 0) {
                    global.balances[transaction.payer] = 0;
                }

                // If the transaction still has points left, update the heap
                if (transaction.points > 0) {
                    global.transactionHeap.pop();  // Remove it from the heap
                    global.transactionHeap.push(transaction);  // Reinsert with updated points
                    console.log('Reinserted transaction with updated points:', transaction);
                } else {
                    global.transactionHeap.pop();  // Remove the transaction if all points are spent
                    console.log('Popped transaction:', transaction);
                }

                spendPoints = 0;  // All points have been spent, exit loop
            } else {
                // Spend all points from this transaction
                if (response[transaction.payer]) {
                    response[transaction.payer] -= transactionPoints;
                } else {
                    response[transaction.payer] = -transactionPoints;
                }

                global.balances[transaction.payer] -= transactionPoints;

                // Ensure that the payer's balance is tracked as 0 if all points are spent
                if (global.balances[transaction.payer] === 0) {
                    global.balances[transaction.payer] = 0;
                }

                global.transactionHeap.pop();  // Remove the transaction
                console.log('Popped transaction:', transaction);
                spendPoints -= transactionPoints;  // Deduct the transaction points from spendPoints
            }
        }

        // Print remaining transactions in the heap for debugging
        console.log('Remaining transactions in the heap:', global.transactionHeap.toArray());

        // Print current payer balances for debugging
        console.log('Current payer balances:', global.balances);

        // Return the spent points summary
        return res.status(200).json(response);
    }
});

module.exports = router;
