import express from 'express';
import bcrypt from 'bcrypt';

import { User, UserDocument } from '../models/userModel';


export const userRouter = express.Router();
/*

/user/
    login
        POST -> fai il login

    signup
        POST -> add new account

    reservations
        GET -> see my reservatuions
        POST -> add new reservation
        PUT -> edit reservation
        DELETE -> cancel reservation

    profile
        GET -> get user info
        PUT -> edit user info
        DELETE -> remove user and all his reservations

/rooms/
    GET -> list all rooms
    POST -> create new room

    :id
        GET -> list that room
        PUT -> modify room




*/

userRouter.get('/', async (req, res) => {
    const users: Array<UserDocument> = await User.find();
    users.forEach(user => console.log(user.username));

    res.status(200).json(users);
});

userRouter.post('/signup', (req, res) => {
    const newUser = User.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        hash: bcrypt.hashSync(req.body.password, 15)
    });

    newUser.save();
    res.status(200).json(newUser.toJSON());
});
