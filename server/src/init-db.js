import mongoose from 'mongoose';
import User from './models/user.model.js';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb://localhost:27017/bookmyhostel';

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user exists
    const adminExists = await User.findOne({ email: 'admin@bookmyhostel.com' });
    
    if (!adminExists) {
      // Create admin user
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@bookmyhostel.com',
        password: 'admin123', // This will be hashed by the pre-save middleware
        role: 'admin',
        phone: '1234567890',
        isVerified: true,
        isActive: true
      });

      await adminUser.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 