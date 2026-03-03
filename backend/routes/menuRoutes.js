const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const mongoose = require('mongoose');

const mockData = require('../menuData');

// GET /api/menu
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, count: mockData.length, data: mockData });
        }

        let items = await MenuItem.find({});
        if (items.length !== mockData.length) {
            await MenuItem.deleteMany({});
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
