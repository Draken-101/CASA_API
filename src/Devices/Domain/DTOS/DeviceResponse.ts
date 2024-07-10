
export interface DeviceResponse {
    nameDevice:string;
    status:boolean;
}

export interface DeviceTriggerResponse{
    triggerDevice:object;
    message: string;
    success:boolean;
}

export interface DeviceCreateResponse{
    newDevice:object;
    success:boolean;
    message:string;
} 