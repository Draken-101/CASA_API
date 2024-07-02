import { UserCreateRequest } from "../../Domain/DTOS/UserRequest";
import UserRepository from "../../Domain/Repositories/UserRepository";

export default class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(user: UserCreateRequest){
        return await this.userRepository.CreateUser(user);
    }
}