const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const mongoose = require('mongoose');

const mockData = [
    {
        name: "Paneer Butter Masala",
        description: "Rich and creamy dish of paneer (cottage cheese) in a tomato, butter and cashew sauce.",
        price: 180,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
        isVegetarian: true,
        isSpicy: false
    },
    {
        name: "Mysore Masala Dosa",
        description: "Crispy crepe spread with a spicy red chutney and served with potato curry.",
        price: 90,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?auto=format&fit=crop&q=80&w=600",
        isVegetarian: true,
        isSpicy: true
    },
    {
        name: "Gobi Manchurian",
        description: "Popular Indo-Chinese appetizer made with cauliflower florets deep-fried and tossed in a sweet, sour, and hot manchurian sauce.",
        price: 120,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1626776876729-bab43bfe0e51?auto=format&fit=crop&q=80&w=600",
        isVegetarian: true,
        isSpicy: true
    },
    {
        name: "Gulab Jamun",
        description: "Deep-fried milk dumplings dipped in a rose-cardamom flavored sugar syrup.",
        price: 50,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
        isVegetarian: true,
        isSpicy: false
    }
];

// GET /api/menu
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, count: mockData.length, data: mockData });
        }

        let items = await MenuItem.find({});
        if (items.length === 0) {
            items = await MenuItem.insertMany(mockData);
        }
        res.json({ success: true, count: items.length, data: items });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/menu
router.post('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(201).json({ success: true, data: { ...req.body, _id: new mongoose.Types.ObjectId() } });
        }
        const item = await MenuItem.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
