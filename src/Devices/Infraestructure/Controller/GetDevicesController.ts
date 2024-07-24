import { Request, Response } from "express";
import GetDevicesUseCase from "../../Application/UseCase/GetDevicesUseCase";
import { custom, customText } from "../../../config/Services/customSignale";

export default class GetDevicesController{
    constructor (private readonly deviceRepository: GetDevicesUseCase){}

    async run(_req:Request, res:Response){
        const Devices = await this.deviceRepository.execute();
        res.status(200).json(Devices);
        custom.Success(
            "✅" +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            customText.colors.magenta + '¡Han pedido los dispositivos!' + customText.end +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            "✅" 
        );
        return;
    }

}