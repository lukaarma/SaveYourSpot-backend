import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import ERRORS from '../utils/Errors';
import { logger } from '../utils/Logger';
import { User, UserDocument } from '../models/userModel';

const jwtSecret = fs.readFileSync('.key');


function normalizePaths(paths: Array<string>): Array<string> {
    return paths.map(path => {
        if (path.endsWith('/')) {
            return path.substr(0, path.length - 1);
        }
        else {
            logger.error(`Error parsing '${path}'! Check the required syntax.`);
        }
    }).filter(path => path !== undefined) as Array<string> ?? [];
}

/**
 * All input paths should end with a slash and all children will be also secured
 */
export default (securedPaths?: Array<string>, adminPaths?: Array<string>):
    ((req: Request, res: Response, next: NextFunction) => void) => {

    const normalizedSecuredPaths = normalizePaths(securedPaths ?? []);
    const normalizedAdminPaths = normalizePaths(adminPaths ?? []);

    logger.verbose('[JWTauth] secure paths: \n' +
        JSON.stringify(normalizedSecuredPaths, null, 4));
    logger.verbose('[JWTauth] admin paths: \n' +
        JSON.stringify(normalizedAdminPaths, null, 4));


    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const secure: Array<string> = normalizedSecuredPaths;
        const admin: Array<string> = normalizedAdminPaths;

        if (secure.some(secure => req.path.match(secure))) {
            if (req.cookies.Authorization &&
                jwt.verify(req.cookies.Authorization, jwtSecret)) {
                next();
            }
            else {
                res.status(ERRORS.AUTH.INVALID_TOKEN.status)
                    .json(ERRORS.AUTH.INVALID_TOKEN);
            }
        }
        else if (admin.some(admin => req.path.match(admin))) {
            if (req.cookies.Authorization && jwt.verify(req.cookies.Authorization, jwtSecret)) {
                const decoded = jwt.decode(req.cookies.Authorization);

                if (decoded && typeof decoded === 'object') {
                    const user: UserDocument = await User.findById(decoded.userId);
                    if (user) {
                        if (user.role !== 'user') {
                            next();
                        }
                        else {
                            res.status(ERRORS.AUTH.ACCESS_DENIED.status)
                                .json(ERRORS.AUTH.ACCESS_DENIED);
                        }
                    }
                    else {
                        res.status(ERRORS.GENERAL.USER_NOT_FOUND.status)
                            .json(ERRORS.GENERAL.USER_NOT_FOUND);
                    }
                }
                else {
                    res.status(ERRORS.GENERAL.BAD_TOKEN.status)
                        .json(ERRORS.GENERAL.BAD_TOKEN);
                }
            }
            else {
                res.status(ERRORS.AUTH.INVALID_TOKEN.status)
                    .json(ERRORS.AUTH.INVALID_TOKEN);
            }
        }
        else {
            next();
        }
    };
};
