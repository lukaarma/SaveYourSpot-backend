import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

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
export default (securedPaths?: Array<string>, adminPaths?: Array<string>): ((req: Request, res: Response, next: NextFunction) => void) => {

    const normalizedSecuredPaths = normalizePaths(securedPaths ?? []);
    const normalizedAdminPaths = normalizePaths(adminPaths ?? []);

    logger.verbose('[JWTauth] secure paths: \n' + JSON.stringify(normalizedSecuredPaths, null, 4));
    logger.verbose('[JWTauth] admin paths: \n' + JSON.stringify(normalizedAdminPaths, null, 4));


    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const secure: Array<string> = normalizedSecuredPaths;
        const admin: Array<string> = normalizedAdminPaths;

        if (secure.some(secure => req.path.match(secure))) {
            if (req.cookies.Authorization && jwt.verify(req.cookies.Authorization, jwtSecret)) {
                next();
            }
            else {
                res.status(401).json({
                    error: 'Invalid or expired token, please auithenticate again'
                });
            }
        }
        else if (admin.some(admin => req.path.match(admin))) {
            if (req.cookies.Authorization && jwt.verify(req.cookies.Authorization, jwtSecret)) {
                const decoded = jwt.decode(req.cookies.Authorization);

                if (decoded && typeof decoded === 'object') {
                    const user: UserDocument = await User.findById(decoded.userId);
                    if (user) {
                        if (user.role === 'admin') {
                            next();
                        }
                        else {
                            res.status(403).json({
                                error: "You don't have permission to acces these resources! \n" +
                                       'This attempt has been logged'
                            });
                        }
                    }
                    else {
                        res.status(500).json({
                            error: 'Error, user not found! Please contact support.'
                        });
                    }
                    // TODO: finish
                    next();
                }
                else {
                    res.status(500).json({
                        error: 'Error decoding auth token, please authenticate again.'
                    });
                }
            }
            else {
                res.status(401).json({
                    error: 'Invalid or expired token, please auithenticate again.'
                });
            }
        }
        else {
            next();
        }
    };
};
