const express = require('express');
const router = express.Router();

// Route for the login page
router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;