"use server";
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting MongoDB connection...');
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this for more stable connections
    });
    console.log('MongoDB Connected:');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed'); // Helps debug in logs
  }
};

export default connectDB;