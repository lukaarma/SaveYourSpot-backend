import mongoose from 'mongoose';


// REQUEST BODIES //
type LoginBody = {
    email: string,
    password: string
}

type SignupBody = {
    firstName: string,
    lastName: string,
    birthdate: string,
    email: string,
    password: string,
    phoneNumber: string
}

export { LoginBody, SignupBody };


// MODEL INTERFACES //
type CustomModel<T> = mongoose.Model<any> & {
    build(item: T): CustomDocument<T>
}
type CustomDocument<T> = mongoose.Document & T;

export { CustomDocument, CustomModel };
