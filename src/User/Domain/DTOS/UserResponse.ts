export interface UserResponse {
    message: string;
    state: boolean;
}

export interface UserLoginResponse extends UserResponse {
    token: string;
}