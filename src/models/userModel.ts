import mongoose from 'mongoose';

import { CustomDocument, CustomModel } from '../utils/Types';


type UserInterface = {
    firstName: string,
    lastName: string,
    username: string,
    hash: string,
    creationDate?: Date
}
export type UserDocument = CustomDocument<UserInterface>;

// create the schema for the database
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

// add the build method
userSchema.static('build', (item: UserInterface): UserDocument =>  {
    return new User(item);
});

// turn the schema into a model
export const User = mongoose.model<UserDocument, CustomModel<UserInterface>>
    ('user', userSchema, 'users');

// ...
// profit!
