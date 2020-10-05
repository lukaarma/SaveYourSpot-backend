import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import dotenv from 'dotenv';

import { argv } from './utils/CommandLineParser';
import { initDb } from './utils/Databse';
import { userRouter } from './routers/userRouter';
import { logger } from './utils/Logger';


async function init(): Promise<void> {
    logger.level = argv.debug ? 'debug' : (argv.verbose ? 'verbose' : 'info');
    dotenv.config();

    await initDb();

    return;
}

async function main(): Promise<void> {
    init();
    const app = express();

    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(helmet());

    app.use('/users', userRouter);

    const serverConnection = `${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`;

    app.listen(serverConnection, () => logger.info(`listening on '${serverConnection}'`));

    return;
}


main();
