const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { points } = req.body;
    res.status(200);
});

module.exports = router;