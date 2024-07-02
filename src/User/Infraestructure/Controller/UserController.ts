import { Request, Response } from "express";
import UserUseCase from "../../Application/UseCase/UserUseCase";
import { UserResponse } from "../../Domain/DTOS/UserResponse";
import signale from "signale";
import { UserCreateRequest, UserLoginRequest } from "../../Domain/DTOS/UserRequest";

export default class UserController {
    constructor(private readonly userMongoRepository: UserUseCase) { }

    async CreateUser(req: Request, res: Response): Promise<UserResponse | null> {
        const { name, email, password, rol } = req.body;
        const user: UserCreateRequest = { name, email, password, rol };

        const newUser = await this.userMongoRepository.CreateUser(user);

        signale.success(newUser);
        res.status(200).json(newUser);
        return newUser;
    }

    async Login(req: Request, res: Response):Promise<UserResponse | null>{
        const { name, password } = req.body;

        const user: UserLoginRequest = { name, password }

        return await this.userMongoRepository.Login(user);
    }
}