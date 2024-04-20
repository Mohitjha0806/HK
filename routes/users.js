const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.get('/add', (req, res) => {
    res.render('add_user');
});

router.post('/add', [
    body('name').trim().not().isEmpty().withMessage('Name is required'),

    body('email').trim().isEmail().withMessage('Invalid email address'),

    body('mobile').trim().matches(/^(?:\+?88)?01[3-9]\d{8}$/).withMessage('Invalid mobile number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, mobile } = req.body;
        const newUser = await User.query().insert({ name, email, mobile });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
