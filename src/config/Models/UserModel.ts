import { Document, Model, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    ComparedPassword: (comparedPassword: string) => Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
    EncriptPassword: (newPassword: string) => Promise<string>;
}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true }
});

UserSchema.methods.ComparedPassword = function (comparedPassword: string): Promise<boolean> {
    return bcrypt.compare(comparedPassword, this.password)
};

UserSchema.statics.EncriptPassword = async function (newPassword: string): Promise<string> {
    return bcrypt.hash(newPassword, await bcrypt.genSalt(10));
}

const User:UserModel  = model<UserDocument, UserModel>('User', UserSchema);

export default User; 