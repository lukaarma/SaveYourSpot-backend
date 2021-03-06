import mongoose from 'mongoose';

import { CustomDocument, CustomModel } from '../utils/Types';


type UserInterface = {
    firstName: string,
    lastName: string,
    birthdate: string,
    email: string,
    hash: string,
    phoneNumber: string,
    role?: string,
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
    birthdate: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
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
export const User = mongoose.model<UserDocument, CustomModel<UserInterface>>(
    'user',         // model name
    userSchema,     // model schema
    'users'         // collection name
);

// ...
// profit!
