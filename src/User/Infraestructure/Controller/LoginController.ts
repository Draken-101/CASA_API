import { Request, Response } from "express";
import LoginUseCase from "../../Application/UseCase/LoginUseCase";
import { UserLoginRequest } from "../../Domain/DTOS/UserRequest";
import { custom, customText } from "../../../config/Services/customSignale";

export default class LoginController {
    constructor(private readonly login: LoginUseCase) { }

    async run(req: Request, res: Response) {
        const { name, password } = req.body;

        const user: UserLoginRequest = { name, password };

        custom.Login(
            '\n' + customText.bold + customText.colors.cyan + '{' + customText.end + '\n' +
            customText.bold + customText.colors.blanco + '   name: ' + customText.end +
            customText.colors.cyan + user.name + customText.bold + customText.colors.blanco + '\n' +
            customText.bold + customText.colors.cyan + '}' + customText.end
        );

        const result = await this.login.execute(user);

        res.status(200).json(result);
        return result;
    }
}