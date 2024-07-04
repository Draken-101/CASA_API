import { Request, Response } from "express";
import GetDevicesUseCase from "../../Application/UseCase/GetDevicesUseCase";

export default class GetDevicesController{
    constructor (private readonly deviceRepository: GetDevicesUseCase){}

    async run(_req:Request, res:Response){
        const Devices = await this.deviceRepository.execute();
        res.status(200).json(Devices);
        return;
    }

}