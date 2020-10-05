import mongoose from 'mongoose';


// define the object
type ReservationInterface = {
    userId: string,
    roomId: number,
    createdDate: Date,
    startDate: Date,
    duration: number,
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
    creationDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true,
        required: true
    }
});

reservationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

// add the build method
reservationSchema.static('build', (item: ReservationInterface): ReservationDocument => {
    return new Reservation(item);
});

// turn the schema into a model
export const Reservation = mongoose.model<ReservationDocument, ReservationModelInterface>('reservation', reservationSchema);

// ...
// profit!
