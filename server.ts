import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app';

const startServer = async (): Promise<void> => {
  try {
    // بررسی MONGO_URI
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    // اتصال به MongoDB واقعی (Remote یا Local)
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected (MongoDB)');

    // شروع سرور
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
