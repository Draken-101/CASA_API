import { Request, Response } from "express";
import CreateDeviceUseCase from "../../Application/UseCase/CreateDeviceUseCase";

export default class CreateDeviceController {
    constructor(private readonly deviceRepository: CreateDeviceUseCase) { }

    async run(req: Request, res:Response){
        const { name } = req.body;

        const result = await this.deviceRepository.execute({name: name});

        res.status(200).json(result);

        return;
    }
}