import express, { CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { User, UserDocument } from '../models/userModel';
import { LoginBody, SignupBody } from '../utils/Types';
import { logger, iterateValidationError } from '../utils/Logger';
import { validateUser } from '../validators';
import ERRORS from '../utils/Errors';

export const userRouter = express.Router();
const jwtSecret = fs.readFileSync('.key');


userRouter.post('/login', async (req, res) => {
    const login: LoginBody = req.body;

    logger.debug(`[LOGIN] body \n${JSON.stringify(req.body, null, 4)} \n`);

    const user: UserDocument = await User.findOne({ email: login.email });
    if (user && bcrypt.compareSync(login.password, user.hash)) {
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            maxAge: (60 * 60 * 1000),
        };
        res.cookie('Authorization', `${token}`, cookieOptions);

        res.status(200).json({
            firstName: user.firstName,
            isAdmin: user.role === 'user' ? false : true
        });
    }
    else {
        res.status(401).json({
            code: 401,
            type: 'AuthError',
            message: 'The email or the password are incorrect!'
        });
    }
});


userRouter.post('/signup', async (req, res) => {
    const { value, error } = validateUser.validate(req.body, { presence: 'required' });
    if (error) {
        logger.debug(iterateValidationError(error));
        const response = ERRORS.GENERAL.MISSING_FIELD;

        if (error.details[0].type === 'any.required') {
            response.details = error.message;
            res.status(ERRORS.GENERAL.MISSING_FIELD.status).send(response);
        }
        else {
            res.status(400).send('suca');
        }
    }
    else {
        const signup: SignupBody = value;

        if (await User.findOne({ email: signup.email })) {
            res.status(400).json({
                code: 102,
                type: 'EmailNotAviable',
                message: 'The email is already assigned to a user'
            });
        }
        else {
            bcrypt.hash(signup.password, /* 10 */ 12).then(async (hash) => {
                const newUser = User.build({
                    firstName: signup.firstName,
                    lastName: signup.lastName,
                    email: signup.email,
                    hash: hash,
                    birthdate: signup.birthdate,
                    phoneNumber: signup.phoneNumber
                });

                logger.debug(`[SIGNUP] new user: ${JSON.stringify(newUser.toObject(), null, 4)}`);

                await newUser.save();
                res.status(200).json(newUser.toJSON());
            });
        }
    }
});


userRouter.post('/checkEmail/:email', async (req, res) => {
    const toCheck = req.params.email;

    if (await User.findOne({ email: toCheck })) {
        res.status(400).json({
            code: 103,
            type: 'EmailNotAviable',
            message: 'This email has already an account associated with it, try logging in'
        });
    }
    else {
        res.status(200).send();
    }
});
