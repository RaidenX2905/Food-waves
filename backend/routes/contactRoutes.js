const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const mongoose = require('mongoose');

// POST /api/contact
router.post('/',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Must be a valid email'),
        body('message').trim().notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            if (mongoose.connection.readyState !== 1) {
                return res.status(201).json({ success: true, message: 'Message received (mock mode)' });
            }

            const contact = await ContactMessage.create(req.body);
            res.status(201).json({ success: true, data: contact });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    });

module.exports = router;
