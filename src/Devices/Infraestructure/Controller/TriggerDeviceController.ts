import { Request, Response } from "express";
import TriggerDeviceUseCase from "../../Application/UseCase/TriggerDeviceUseCase";

export default class TriggerDeviceController{
    constructor(private readonly deviceRepository: TriggerDeviceUseCase){}

    async run(req:Request, res:Response){
        const { name, nameUser, role } = req.body;
        const result = await this.deviceRepository.execute(name);
        if (!result.success) {
            res.status(403).send(result);
        }
        res.status(200).json(result);
        return;
    }
}