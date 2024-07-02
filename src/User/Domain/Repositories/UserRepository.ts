import { UserCreateRequest, UserLoginRequest } from "../DTOS/UserRequest";
import { UserResponse } from "../DTOS/UserResponse";

export default interface UserRepository{
    CreateUser(user: UserCreateRequest):Promise<UserResponse | null>;
    CreateAdmin(user: UserCreateRequest):Promise<void>;
}