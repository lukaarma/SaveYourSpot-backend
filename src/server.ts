/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import mongoose from 'mongoose';
import { userRouter } from './routers/userRouter';




async function main(): Promise<void> {
    const app = express();

    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(helmet());

    app.use('/users', userRouter);

    // FIXME
    mongoose.connect('mongodb://localhost/SaveYourSpot',{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } ,() => console.log('Database connected!'));

    app.listen(6789, () => console.log('listening on http://localhost:6789'));
}


main();
