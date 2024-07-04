import { UserResponse } from "../../Domain/DTOS/UserResponse";
import { UserCreateRequest } from "../../Domain/DTOS/UserRequest";
import CreateUserUseCase from "../../Application/UseCase/CreateUseCase";
import { custom, customText } from "../../../config/Services/customSignale";
import { Request, Response } from "express";

export default class UserCreateController {
    constructor(private readonly userCreate: CreateUserUseCase) { }

    async run(req: Request, res: Response): Promise<UserResponse> {
        const { name, email, password, role } = req.body.newUser;


        const user: UserCreateRequest = { name, email, password, role };

        custom.NewUser(
            '\n' + customText.bold + customText.colors.cyan + '{' + customText.end + '\n' +
            customText.bold + customText.colors.blanco + '   name: ' + customText.end +
            customText.colors.cyan + user.name + customText.bold + customText.colors.blanco + ',\n' +
            customText.bold + customText.colors.blanco + '   email: ' + customText.end +
            customText.colors.cyan + user.email + customText.bold + customText.colors.blanco + ',\n' +
            customText.bold + customText.colors.blanco + '   role: ' + customText.end +
            customText.colors.cyan + user.role + customText.end + '\n' +
            customText.bold + customText.colors.cyan + '}' + customText.end
        );

        const newUser = await this.userCreate.execute(user); 

        res.status(200).json(newUser);
        return newUser;
    }
}