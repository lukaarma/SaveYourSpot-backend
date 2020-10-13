import mongoose from 'mongoose';

import { CustomDocument, CustomModel } from '../utils/Types';


type ReservationInterface = {
    userId: string,
    roomId: string,
    creationDate: Date,
    startDate: string,
    duration: number,
    isValid: boolean
}
export type ReservationDocument = CustomDocument<ReservationInterface>;

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
        required: true,
        default: Date.now()
    },
    startDate: {
        type: String,
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

reservationSchema.static('build', (item: ReservationInterface): ReservationDocument => {
    return new Reservation(item);
});

export const Reservation = mongoose.model<ReservationDocument, CustomModel<ReservationInterface>>(
    'reservation',
    reservationSchema,
    'reservations'
);
