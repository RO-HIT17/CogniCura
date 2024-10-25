import { Schema, model, Document } from 'mongoose';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
  }

export interface IUser extends Document {
  _id: string;
  firstName:string;
  lastName:string;
  userName:string;
  mobile:number;
  email: string;
  password: string;
  role: Role;
  otp?: string;
  otpExpiration?: number;
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.USER, required: true },
    otp: { type: String },
    otpExpiration: { type: Number },
  }); 

export const UserModel = model<IUser>('User', UserSchema);
