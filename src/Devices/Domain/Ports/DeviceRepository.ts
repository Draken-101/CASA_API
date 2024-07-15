import { Request, Response } from "express";
import { DeviceRequest, DeviceTriggerRequest } from "../DTOS/DeviceRequest";
import { DeviceCreateResponse, DeviceResponse, DeviceTriggerResponse } from "../DTOS/DeviceResponse";


export default interface DeviceRepository {
    CreateDevice(device: DeviceRequest): Promise<DeviceCreateResponse | null>;
    GetDevices(): Promise<DeviceResponse[] | object>;
    TriggerDevice(device: DeviceTriggerRequest): Promise<DeviceTriggerResponse>;
    GetRealTimeStatusDevices(req: Request, res:Response):Promise<void>;
}