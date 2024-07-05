import { Request, Response } from "express";
import CreateDeviceUseCase from "../../Application/UseCase/CreateDeviceUseCase";
import { custom, customText } from "../../../config/Services/customSignale";

export default class CreateDeviceController {
    constructor(private readonly deviceRepository: CreateDeviceUseCase) { }

    async run(req: Request, res: Response) {
        const { nameDevice } = req.body;

        const result = await this.deviceRepository.execute({ nameDevice });

        res.status(200).json(result);

        if (!result?.success) {
            custom.Error(
                "🌐" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.bold + customText.colors.blanco + nameDevice + customText.end +
                customText.colors.magenta + ', ' + result?.message + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "🌐"
            );
        }
        custom.Success(
            "✅" +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            customText.bold + customText.colors.blanco + nameDevice + customText.end +
            customText.colors.magenta + ', ' + customText.end +
            customText.colors.magenta + result?.message + customText.end +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            "✅"
        );
        return;
    }
}