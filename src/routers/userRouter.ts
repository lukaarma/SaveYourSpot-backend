import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { User, UserDocument } from '../models/userModel';
import { LoginBody, SignupBody } from '../utils/Types';
import { logger } from '../utils/Logger';

export const userRouter = express.Router();
const jwtSecret = fs.readFileSync('.key');

userRouter.get('/', async (req, res) => {
    res.status(200).send('You reached a protected enpoint, hurray!');
});

userRouter.post('/login', async (req, res) => {
    const login: LoginBody = req.body;

    logger.debug(`[LOGIN] body \n${JSON.stringify(req.body, null, 4)} \n`);

    const user: UserDocument = await User.findOne({ email: login.email });

    if (bcrypt.compareSync(login.password, user.hash)) {
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + (60 * 60 * 1000))
        };
        res.cookie('Authorization', `${token}`, cookieOptions);

        res.status(200).json(user.toJSON());
    }
    else {
        res.status(200).json({
            error: 'Wrong password!'
        });
    }
});

userRouter.post('/signup', async (req, res) => {
    const signup: SignupBody = req.body;

    if (await User.findOne({ email: signup.email })) {
        res.status(200).json({
            error: 'email already in use'
        });
    }
    else {
        bcrypt.hash(signup.password, 10 /* 12 */).then(async (hash) => {
            const newUser = User.build({
                firstName: signup.firstName,
                lastName: signup.lastName,
                email: signup.email,
                hash: hash,
                birthDate: signup.birthDate,
                phoneNumber: signup.phoneNumber
            });

            logger.debug(`[SIGNUP] new user: ${JSON.stringify(newUser.toObject(), null, 4)}`);

            await newUser.save();
            res.status(200).json(newUser.toJSON());
        });
    }
});

userRouter.post('/checkEmail/:email', async (req, res) => {
    const toCheck = req.params.email;

    if (await User.findOne({ email: toCheck })) {
        res.status(200).json({
            isValid: false,
            error: 'Email already in use'
        });

    }
    else {
        res.status(200).json({ isValid: true });
    }
});
