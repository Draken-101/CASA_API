export interface DeviceRequest{
    nameDevice:string;
}

export interface DeviceTriggerRequest extends DeviceRequest{
    status?:boolean;
    roleUser:string;
    nameUser:string;
}