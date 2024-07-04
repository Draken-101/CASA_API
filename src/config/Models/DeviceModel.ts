import { Document, Schema, model } from "mongoose";

interface DeviceDocument extends Document {
    name: string;
    status: boolean;
    position?: number[];
    TriggerStatus: () => Promise<boolean>;
}

const DeviceSchema = new Schema<DeviceDocument>({
    name: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    position: []
});

DeviceSchema.methods.TriggerStatus = function () {
    this.status = !this.status;
    return this.status;
}

const DeviceModel = model<DeviceDocument>('Device', DeviceSchema);

export default DeviceModel;
