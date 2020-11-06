import mongoose from 'mongoose';


// REQUEST BODIES //
type LoginBody = {
    email: string,
    password: string
}

type SignupBody = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthdate: string,
    phoneNumber: string
}

export { LoginBody, SignupBody };


// MODEL INTERFACES //
type CustomModel<T> = mongoose.Model<any> & {
    build(item: T): CustomDocument<T>
}
type CustomDocument<T> = mongoose.Document & T;

export { CustomDocument, CustomModel };
