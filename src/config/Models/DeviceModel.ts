import { Document, Schema, model } from "mongoose";

interface DeviceDocument extends Document {
    name: string;
    status: boolean;
    TriggerStatus: () => Promise<boolean>;
}

const DeviceSchema = new Schema<DeviceDocument>({
    name: { type: String, required: true },
    status: { type: Boolean, required: true, default: false}
});

DeviceSchema.methods.TriggerStatus = function(){
    this.status = !this.status;
    return this.status;
}

const DeviceModel = model<DeviceDocument>('Decive', DeviceSchema);

export default DeviceModel;
