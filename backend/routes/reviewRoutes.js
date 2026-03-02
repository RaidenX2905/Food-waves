const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Review = require('../models/Review');
const mongoose = require('mongoose');

const mockReviews = [
    {
        _id: "1",
        author: "Rahul M.",
        rating: 5,
        comment: "The absolute best place in Mysuru! Open 24x7 and the food is always fresh. The Mysore Masala Dosa is a must-try.",
        date: new Date()
    },
    {
        _id: "2",
        author: "Sneha P.",
        rating: 4,
        comment: "Great ambiance and quick service. The Paneer Butter Masala was very creamy. Prices are incredibly reasonable.",
        date: new Date(Date.now() - 86400000)
    },
    {
        _id: "3",
        author: "Kiran K.",
        rating: 5,
        comment: "Late night cravings brought me here. Flawless experience, fast delivery, and the interior looks super premium.",
        date: new Date(Date.now() - 172800000)
    }
];

// GET /api/reviews
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, count: mockReviews.length, data: mockReviews });
        }

        let reviews = await Review.find().sort({ date: -1 });
        if (reviews.length === 0) {
            reviews = await Review.insertMany(mockReviews.map(({ _id, ...rest }) => rest));
        }
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
