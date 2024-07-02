import { UserCreateRequest, UserLoginRequest } from "../DTOS/UserRequest";
import { UserResponse } from "../DTOS/UserResponse";

export default interface UserRepository{
    CreateUser(User: UserCreateRequest):Promise<UserResponse | null>;
    Login(user: UserLoginRequest): Promise<UserResponse | null>
}