const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Review = require('../models/Review');
const mongoose = require('mongoose');

const mockReviews = [];

// GET /api/reviews
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, count: mockReviews.length, data: mockReviews });
        }

        let reviews = await Review.find().sort({ date: -1 });
        res.json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/reviews
router.post('/',
    [
        body('author').trim().notEmpty().withMessage('Author name is required'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('comment').trim().notEmpty().withMessage('Comment is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            if (mongoose.connection.readyState !== 1) {
                const newReview = { ...req.body, _id: Date.now().toString(), date: new Date() };
                mockReviews.unshift(newReview);
                return res.status(201).json({ success: true, data: newReview });
            }

            const review = await Review.create(req.body);
            res.status(201).json({ success: true, data: review });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    });

module.exports = router;
