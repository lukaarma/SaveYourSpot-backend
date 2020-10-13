import mongoose from 'mongoose';

import { CustomDocument, CustomModel } from '../utils/Types';


type OrganizationInterface = {
    name: string,
    description?: string,
    streetAddress: string,
    phoneNumber: string,
    email?: string,
    totalRooms: string,
    creationDate?: Date
}
export type OrganizationDocument = CustomDocument<OrganizationInterface>;

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    streetAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    totalRooms: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

organizationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

organizationSchema.static('build', (item: OrganizationInterface): OrganizationDocument =>  {
    return new Organization(item);
});

export const Organization = mongoose.model<OrganizationDocument, CustomModel<OrganizationInterface>>(
    'organization',
    organizationSchema,
    'organizations'
);
