import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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
    await init();
    const app = express();

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan('dev'));
    // FIXME
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    objectSrc: ["'none'"]
                }
            }
        })
    );
    app.use(express.static('src/app'));


    if (argv.debug) {
        const echo = (req: any, res: any): void => {
            const message = '[ECHO] \n' +
                ' **HEADERS** \n' +
                JSON.stringify(req.headers, null, 4) + '\n' +
                ' **COOKIES** \n' +
                JSON.stringify(req.cookies, null, 4) + '\n' +
                ' **BODY** \n' +
                JSON.stringify(req.body, null, 4);
            logger.debug(message);
            res.status(200).json({ message: 'ECHO done, check console' });
        };

        app.get('/echo', echo);
        app.post('/echo', echo);
        app.put('/echo', echo);
        app.delete('/echo', echo);
    }

    app.use('/users', userRouter);

    app.listen(process.env.PORT, () => logger.info(`listening on 'http://localhost:${process.env.PORT}'`));

    return;
}


main();
