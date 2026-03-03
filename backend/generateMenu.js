const fs = require('fs');
const https = require('https');
const axios = require('axios');

// Using TheMealDB for highly reliable, permanent food images
// First we fetch all Indian meals
const fetchMeals = async () => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        return response.data.meals;
    } catch (error) {
        console.error("Error fetching from MealDB:", error);
        return [];
    }
};

const generateMenu = async () => {
    const meals = await fetchMeals();
    if (!meals || meals.length === 0) {
        console.log("Failed to fetch meals.");
        return;
    }

    const starters = ["Samosa", "Pakora", "Gobi Manchurian", "Paneer Tikka", "Chicken Tikka", "Onion Bhaji", "Chilli Paneer", "Aloo Tikki", "Harabara Kebab", "Chicken 65", "Papdi Chaat", "Dahi Puri", "Pani Puri", "Bhel Puri", "Seekh Kebab", "Tandoori Mushrooms", "Crispy Corn", "Spring Rolls", "Mushroom Manchurian", "Veg Lollipop"];
    const mains = ["Paneer Butter Masala", "Mysore Masala Dosa", "Dal Makhani", "Chana Masala", "Palak Paneer", "Malai Kofta", "Butter Chicken", "Chicken Tikka Masala", "Lamb Rogan Josh", "Vegetable Biryani", "Chicken Biryani", "Mutton Biryani", "Kadai Paneer", "Baingan Bharta", "Aloo Gobi", "Bhindi Masala", "Matar Paneer", "Fish Curry", "Prawn Masala", "Dal Tadka"];
    const desserts = ["Gulab Jamun", "Rasgulla", "Jalebi", "Kheer", "Gajar Ka Halwa", "Rasmalai", "Kulfi", "Mysore Pak", "Payasam", "Shahi Tukda", "Phirni", "Soan Papdi", "Barfi", "Ladoo", "Peda", "Kalakand", "Malpua", "Rabri", "Basundi", "Sandesh"];

    const items = [];

    // We deterministically map a reliable MealDB image to each item
    // MealDB has exactly 10-15 Indian meals. We'll cycle through them safely.

    let mealIndex = 0;
    const getMealImage = () => {
        const url = meals[mealIndex % meals.length].strMealThumb;
        mealIndex++;
        return url;
    };

    const populateCategory = (arr, category, priceBase) => {
        return arr.map((name, i) => {
            return {
                name,
                description: `Authentic ${name} prepared with the finest ingredients and traditional spices.`,
                price: priceBase + (i * 10) % 50,
                category,
                image: getMealImage(),
                isVegetarian: !name.toLowerCase().includes('chicken') && !name.toLowerCase().includes('mutton') && !name.toLowerCase().includes('lamb') && !name.toLowerCase().includes('fish') && !name.toLowerCase().includes('prawn'),
                isSpicy: category !== 'Desserts' && i % 2 === 0
            };
        });
    };

    items.push(...populateCategory(starters, 'Starters', 100));
    items.push(...populateCategory(mains, 'Main Course', 180));
    items.push(...populateCategory(desserts, 'Desserts', 60));

    fs.writeFileSync('./menuData.js', 'module.exports = ' + JSON.stringify(items, null, 4) + ';');
    console.log('Successfully generated robust menu data with MealDB images.');
};

generateMenu();
