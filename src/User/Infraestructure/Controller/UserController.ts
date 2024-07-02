import { Request, Response } from "express";
import { UserResponse } from "../../Domain/DTOS/UserResponse";
import signale from "signale";
import { UserCreateRequest } from "../../Domain/DTOS/UserRequest";
import CreateUserUseCase from "../../Application/UseCase/CreateUseCase";
import CreateAdminUseCase from "../../Application/UseCase/CreateAdminUseCase";
import UserModel from "../../../config/Models/UserModel";

export default class UserController {
    constructor(
        private readonly userCreate: CreateUserUseCase,
        private readonly adminCreate: CreateAdminUseCase
    ) { }

    async CreateAdmin() {
        
        const addAdmin = new UserModel({
            name: "admin", 
            email: "admin@example.com", 
            password: "adminpassword",
            rol: 'admin' 
        });
        await this.adminCreate.execute(addAdmin);
    }

    async run(req: Request, res: Response): Promise<UserResponse | null> {
        const { name, email, password, rol } = req.body;
        const user: UserCreateRequest = { name, email, password, rol };

        const newUser = await this.userCreate.execute(user);

        signale.success(newUser);
        res.status(200).json(newUser);
        return newUser;
    }
}