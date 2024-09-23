const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { payer, points, timestamp } = req.body;
    res.status(200);
});

module.exports = router;