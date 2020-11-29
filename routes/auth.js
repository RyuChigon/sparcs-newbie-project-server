const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use('/', authMiddleware);

router.get('/login', (req, res) => {
    res.send("You logged in!");
})

module.exports = router;