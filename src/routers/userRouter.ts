import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { User, UserDocument } from '../models/userModel';
import { LoginBody, SignupBody } from '../utils/Types';


export const userRouter = express.Router();
const jwtSecret = fs.readFileSync('.key');

userRouter.get('/', async (req, res) => {
    // TODO: move this in middleware
    if (req.cookies.authToken && jwt.verify(req.cookies.authToken, jwtSecret)) {
        const users: Array<UserDocument> = await User.find();
        users.forEach(user => console.log(user.username));

        res.status(200).json(users);
    }
    else {
        res.status(401).send();
    }
});

userRouter.post('/login', async (req, res) => {
    const login: LoginBody = req.body;

    const user: UserDocument = await User.findOne({ username: login.username });

    if (!user) {
        res.status(200).json({
            error: 'Wrong username!'
        });
    }
    else if (bcrypt.compareSync(login.password, user.hash)) {
        const token = jwt.sign({ userID: user.id }, jwtSecret, { expiresIn: '1h' });

        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
        };
        res.cookie('authToken', token, cookieOptions);

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

    if (await User.findOne({ username: signup.username })) {
        res.status(200).json({
            error: 'Username already in use'
        });
    }
    else {
        bcrypt.hash(signup.password, 15).then(async (hash) => {
            const newUser = User.build({
                firstName: signup.firstName,
                lastName: signup.lastName,
                username: signup.username,
                hash: hash
            });

            await newUser.save();
            res.status(200).json(newUser.toJSON());
        });
    }
});
