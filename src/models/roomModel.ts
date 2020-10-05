import mongoose from 'mongoose';


// define the object
type RoomInterface = {
    title: string,
    totalPlaces: number,
}

// add the build signature to the model
type RoomModelInterface = mongoose.Model<any> & {
    build(item: RoomInterface): RoomDocument
}

// create the mongoose.Document with our custo user properties
export type RoomDocument = mongoose.Document & RoomInterface;

// create the schema for the database
const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    totalPlaces: {
        type: Number,
        required: true
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
export const Room = mongoose.model<RoomDocument, RoomModelInterface>('room', roomSchema);

// ...
// profit!
