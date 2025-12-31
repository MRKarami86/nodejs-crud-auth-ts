import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app';

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        console.log('Connecting to MongoDB...');

        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Connected to real MongoDB');
        } else {
            console.log('No MONGO_URI, using MongoMemoryServer');
            const mongod = await MongoMemoryServer.create();
            await mongoose.connect(mongod.getUri());
            console.log('Connected to in-memory MongoDB');
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();
