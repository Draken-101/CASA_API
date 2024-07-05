export interface DeviceRequest{
    nameDevice:string;
}

export interface DeviceTriggerRequest extends DeviceRequest{
    roleUser:string;
    nameUser:string;
}