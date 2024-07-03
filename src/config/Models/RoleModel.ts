import { Document, Schema, model } from "mongoose";

interface RoleDocument extends Document {
    name:string;
}

const RoleSchema = new Schema<RoleDocument>({
    name: { type: String, required: true}
});

const RoleModel = model<RoleDocument>('Role', RoleSchema);

export default RoleModel;