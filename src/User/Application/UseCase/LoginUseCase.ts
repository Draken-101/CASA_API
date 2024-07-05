import AuthServices from "../../../Middleware/Services/Auth";
import { UserLoginRequest } from "../../Domain/DTOS/UserRequest";
import UserRepository from "../../Domain/Repositories/UserRepository";

export default class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly auth: AuthServices
    ) { }

    async execute(user: UserLoginRequest) {
        const result = await this.userRepository.Login(user);

        if (result.state) {
            result.token = this.auth.GenerateToken(user.password);
        }
        return result;
    }
}