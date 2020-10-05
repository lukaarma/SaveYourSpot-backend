import mongoose from 'mongoose';

import { logger } from './Logger';


export async function initDb(): Promise<void> {
    // these will supress warning for deprecated methods in Mongoose
    const mongooseOptions = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    const dbConnection = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}`;

    logger.debug(`[DATABSE] connection string '${dbConnection}'`);

    logger.info('Connecting to database...');
    await mongoose.connect(dbConnection, mongooseOptions);
    logger.info('Databse connected!');
}
