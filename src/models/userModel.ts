import mongoose from 'mongoose';


// define the object
type UserInterface = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    hash: string
}

// add the build signature to the model
type UserModelInterface = mongoose.Model<any> & {
    build(item: UserInterface): UserDocument
}

// create the mongoose.Document with our custo user properties
export type UserDocument = mongoose.Document & UserInterface;

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
    password: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
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
export const User = mongoose.model<UserDocument, UserModelInterface>('user', userSchema);

// ...
// profit!
