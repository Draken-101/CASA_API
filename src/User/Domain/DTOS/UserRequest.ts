export interface UserCreateRequest{
    name:string;
    email:string;
    password:string;
    role:string;
}

export interface UserLoginRequest{
    name:string;
    password:string;
}
