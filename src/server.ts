import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// import helmet from 'helmet';

import dotenv from 'dotenv';

import sanitizeXSS from './middleware/sanitizeXSS';
import JWTAuth from './middleware/JWTauthorizator';
import { argv } from './utils/CommandLineParser';
import { initDb } from './utils/Databse';
import { userRouter } from './routers/userRouter';
import { logger } from './utils/Logger';


async function init(): Promise<void> {
    logger.level = argv.debug ? 'debug' : (argv.verbose ? 'verbose' : 'info');

    logger.info('Loading env variables');
    dotenv.config();

    await initDb();

    return;
}

async function main(): Promise<void> {
    logger.info('Startup Initialization..\n');
    await init();
    logger.info('Initialization done!\n');

    const app = express();

    app.use(morgan('dev'));
    // TODO: maybe create a custom **secure** CSP
    // FIXME: uncomment this => app.use(helmet());
    app.use(cookieParser());
    app.use(JWTAuth(['/users/profile/'], ['/admin/']));
    app.use(express.json());
    app.use(sanitizeXSS);

    if (argv.debug) {
        // FIXME
        app.use(express.static('src/app'));

        const echo = (req: Request, res: Response): void => {
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
