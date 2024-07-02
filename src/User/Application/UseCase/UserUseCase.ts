import { UserCreateRequest, UserLoginRequest } from "../../Domain/DTOS/UserRequest";
import { UserResponse } from "../../Domain/DTOS/UserResponse";
import UserRepository from "../../Domain/Repositories/UserRepository";

export default class UserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async CreateUser(user: UserCreateRequest): Promise<UserResponse | null>{
       return await this.userRepository.CreateUser(user);
    }

    async Login(user: UserLoginRequest): Promise<UserResponse | null>{
        return await this.userRepository.Login(user);
    }
}