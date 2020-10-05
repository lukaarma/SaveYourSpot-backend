import mongoose from 'mongoose';

import { logger } from './Logger';


export async function initDb(): Promise<void> {
    // these will supress warning for deprecated methods in Mongoose
    // TODO: fix for missing env variables
    const mongooseOptions: mongoose.ConnectionOptions = {
        auth: {
            user: process.env.DB_USER ?? '',
            password: process.env.DB_PASSWORD ?? ''
        },
        authSource: process.env.DB_ROLE,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    const dbConnection = `mongodb://${process.env.DB_SERVER}`;

    logger.verbose(`[DATABSE] connection string '${dbConnection}'`);

    logger.info('Connecting to database...');
    await mongoose.connect(dbConnection, mongooseOptions);
    logger.info('Databse connected!');
}
