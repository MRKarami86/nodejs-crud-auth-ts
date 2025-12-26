import dotenv from 'dotenv';
dotenv.config();

import { MongoMemoryServer } from 'mongodb-memory-server';


import mongoose from 'mongoose';

import app from './app';


console.log('Starting server...');

const startServer = async (): Promise<void> => {
  try {
    console.log('Creating in-memory MongoDB...');


    const mongod = await MongoMemoryServer.create(
      {binary: {
      version: '6.0.6',
      downloadDir: 'C:\\Program Files\\MongoDB\\Server\\8.2\\'
    }});

    
    const uri: string = mongod.getUri();

    console.log('MongoDB URI:', uri);



    await mongoose.connect(uri);

    console.log('DB Connected (in-memory)');

    const PORT: number = process.env.PORT
      ? Number(process.env.PORT)
      : 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1); // fail fast
  }
};

startServer();
