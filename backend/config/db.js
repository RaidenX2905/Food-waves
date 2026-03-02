const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongodb_connection_string') {
            console.warn('MONGO_URI is not defined or is default in environment variables. Running in mock mode.');
            return; // Handled gracefully if no DB string is provided
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Do not exit process to allow server to still start (resilience)
        // process.exit(1);
    }
};

module.exports = connectDB;
