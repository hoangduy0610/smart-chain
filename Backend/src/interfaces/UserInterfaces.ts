import { Document } from "mongoose";

export interface UserInterfaces extends Document {
    _id: string;
    roles: string[];
    name: string;
    phoneNumber: string;
}