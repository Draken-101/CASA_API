import { UserCreateRequest, UserLoginRequest } from "../DTOS/UserRequest";
import { UserLoginResponse, UserResponse } from "../DTOS/UserResponse";

export default interface UserRepository {
    CreateUser(user: UserCreateRequest): Promise<UserResponse>;
    Login(user: UserLoginRequest): Promise<UserLoginResponse>;
}