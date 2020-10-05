import mongoose from 'mongoose';


// define the object
type ReservationInterface = {
    userId: string,
    roomId: number,
    createdDate: string,
    excpiredDate: string,
    isValid: boolean

}

// add the build signature to the model
type ReservationModelInterface = mongoose.Model<any> & {
    build(item: ReservationInterface): ReservationDocument
}

// create the mongoose.Document with our custo user properties
export type ReservationDocument = mongoose.Document & ReservationInterface;

// create the schema for the database
const reservationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    expiredDate: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
});

reservationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

// add the build method
reservationSchema.static('build', (item: ReservationInterface): ReservationDocument => {
    return new Reservation(item);
});

// turn the schema into a model
export const Reservation = mongoose.model<ReservationDocument, ReservationModelInterface>('reservation', reservationSchema);

// ...
// profit!
