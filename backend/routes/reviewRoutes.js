const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Review = require('../models/Review');
const mongoose = require('mongoose');

const mockReviews = [
    {
        _id: "test_1",
        author: "Priya S.",
        rating: 5,
        comment: "The absolute best premium dining experience in Mysuru. The ambiance is gorgeous and the food is perfectly spiced. Highly recommend the Biryani!",
        date: new Date()
    },
    {
        _id: "test_2",
        author: "Rahul M.",
        rating: 5,
        comment: "I love that they are open 24/7. My friends and I came in at 2 AM and the fresh quality absolutely blew us away. Incredible service.",
        date: new Date(Date.now() - 86400000)
    },
    {
        _id: "test_3",
        author: "David L.",
        rating: 4,
        comment: "Very elegant interior. The mocktails are refreshing and the curries are rich. Will be coming back with my family next week.",
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
            // Seed the 3 dummy reviews
            reviews = await Review.insertMany(mockReviews.map(({ _id, ...rest }) => rest));
        }
        res.json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        console.error('Reviews GET Error:', err);
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
