import mongoose from 'mongoose';

// REQUEST BODIES //
type LoginBody = {
    username: string,
    password: string
}

type SignupBody = {
    firstName: string,
    lastName: string,
    username: string,
    password: string
}

export { LoginBody, SignupBody };


// MODEL INTERFACES //
type CustomModel<T> = mongoose.Model<any> & {
    build(item: T): CustomDocument<T>
}
type CustomDocument<T> = mongoose.Document & T;

export { CustomDocument, CustomModel };
