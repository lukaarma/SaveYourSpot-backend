import { Request, Response, NextFunction } from 'express';
import sanitize from 'xss';
import { logger } from '../utils/Logger';


export default (req: Request, res: Response, next: NextFunction): void => {
    if (req.body) {
        let XSS = false;
        Object.keys(req.body).forEach(key => {
            const purified = sanitize(req.body[key]);

            if (purified !== req.body[key]) {
                XSS = true;
            }
        });

        if (XSS) {
            logger.error('XSS DETECTED! Check logs.');
            res.status(400).send('What did you want to do? You are now logged on our files!');
        }
        else {
            next();
        }
    }
    else {
        next();
    }
};
