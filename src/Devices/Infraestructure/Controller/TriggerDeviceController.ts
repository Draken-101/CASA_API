import { Request, Response } from "express";
import TriggerDeviceUseCase from "../../Application/UseCase/TriggerDeviceUseCase";
import { custom, customText } from "../../../config/Services/customSignale";

export default class TriggerDeviceController {
    constructor(private readonly deviceRepository: TriggerDeviceUseCase) { }

    async run(req: Request, res: Response) {
        const { nameDevice, nameUser, roleUser } = req.body;
        const result = await this.deviceRepository.execute({ nameDevice, nameUser, roleUser });
        if (!result.success) {
            res.status(403).send(result);
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
            customText.colors.magenta + ', ' + result?.message + customText.end +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            "✅"
        );
        res.status(200).json(result);
        return;
    }
}