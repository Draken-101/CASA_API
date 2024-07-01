import User from "../MODELS/User";

export default interface UserRepository{
    createUser(User: User):Promise<boolean>;
}