import mongoose from 'mongoose';

import { CustomDocument, CustomModel } from '../utils/Types';


type timeFrame = {
    start: number,
    end: number,
    duration: number,
    maxSpots: number
}

type weekTimeTable = {
    [key: number]: Array<timeFrame>
}

type RoomInterface = {
    title: string,
    totalPlaces: number,
    weekTimeTable: weekTimeTable,
    location?: string,
    description?: string,
    creationDate?: Date
}
export type RoomDocument = CustomDocument<RoomInterface>

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    weekTimeTable: {
        type: {
            0: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }],
            1: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }],
            2: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }],
            3: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }],
            4: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }],
            5: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }],
            6: [{
                start: Number,
                end: Number,
                duration: Number,
                maxSpots: Number
            }]
        }
    },
    location: {
        type: String,
    },
    desciption: {
        type: String,
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

roomSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

// add the build method
roomSchema.static('build', (item: RoomInterface): RoomDocument => {
    return new Room(item);
});

// turn the schema into a model
export const Room = mongoose.model<RoomDocument, CustomModel<RoomInterface>>(
    'room', roomSchema, 'rooms'
);
