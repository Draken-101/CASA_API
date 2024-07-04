import { Request, Response } from "express";
import DeviceRepository from "../../Domain/Repositories/DeviceRepository";

export default class GetRealTimeStatusDevicesUseCase{
    constructor(private readonly deviceRepository : DeviceRepository){}

    async execute(req: Request, res:Response){
        return await this.deviceRepository.GetRealTimeStatusDevices(req, res);
    }
}