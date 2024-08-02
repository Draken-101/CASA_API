import { Document, model, Schema } from "mongoose";

interface ActionDocument extends Document{
    user:String;
    role:String;
    device:String;
}

const ActionSchema = new Schema<ActionDocument>({
    user: { type: String },
    role: { type: String },
    device: { type: String, required: true },
});

const ActionModel = model<ActionDocument>('Action', ActionSchema);

export default ActionModel;
