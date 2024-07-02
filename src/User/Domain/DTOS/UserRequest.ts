export interface UserCreateRequest{
    name:string;
    email:string;
    password:string;
    rol:string;
}

export interface UserLoginRequest{
    name:string;
    password:string;
}
