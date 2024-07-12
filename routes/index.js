const express = require('express');
const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
    res.render('index');
});

// Route for form submission
router.post('/submit', (req, res) => {
    const name = req.body.name;
    console.log(`Submitted Name: ${name}`);
    res.send('Form submitted successfully!');
});

module.exports = router;