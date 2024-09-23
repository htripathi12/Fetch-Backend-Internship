const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { points } = req.body;
    if (total - points < 0) {
        res.status(400).send('Insufficient funds');
        return;
    }
    res.status(200);
});

module.exports = router;