const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Starters', 'Main Course', 'Desserts', 'Beverages'
    image: { type: String, required: true },
    isVegetarian: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
