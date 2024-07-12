const express = require('express');
const router = express.Router();

// Route for the logout page
router.get('/', (req, res) => {
    res.render('logout');
});

module.exports = router;