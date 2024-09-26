const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { points } = req.body;
    let response = {};

    // Check if there are enough total points to spend
    if (global.total - points < 0) {
        return res.status(400).send('Insufficient funds');
    }
    
    global.total -= points;
    let spendPoints = points;

    // Spend points from the oldest transaction first
    while (spendPoints > 0 && global.transactionHeap.size() > 0) {
        const transaction = global.transactionHeap.peek();
        const transactionPoints = transaction.points;

        // Calculate how many points can be spent from the current transaction
        const pointsToSpend = Math.min(transactionPoints, spendPoints);
        transaction.points -= pointsToSpend;

        // Add or accumulate points in the response for the payer
        if (response[transaction.payer]) {
            response[transaction.payer] -= pointsToSpend;
        } else {
            response[transaction.payer] = -pointsToSpend;
        }

        // Update the payer's balance in global.balances
        global.balances[transaction.payer] -= pointsToSpend;

        // Ensure the payer's balance is tracked as 0 if all points are spent
        if (global.balances[transaction.payer] === 0) {
            global.balances[transaction.payer] = 0;
        }

        spendPoints -= pointsToSpend;

        // If the transaction still has points left, update the heap, else remove it
        if (transaction.points === 0) {
            global.transactionHeap.pop();
        } else {
            global.transactionHeap.pop();
            global.transactionHeap.push(transaction);  // Reinsert with updated points
        }
    }

    // Combine similar payers in the response object into a final array
    const finalResponse = Object.keys(response).map(payer => ({
        payer: payer,
        points: response[payer]
    }));

    return res.status(200).json(finalResponse);
});

module.exports = router;
