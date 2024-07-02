import { Document, Schema, model } from "mongoose";

interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    rol:string;
}

const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    password: { type: String, require: true},
    rol: { type: String, default: 'Invitado', require: true}
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;