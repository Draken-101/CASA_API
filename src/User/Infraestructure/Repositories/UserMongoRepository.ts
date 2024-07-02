import signale from "signale";
import { UserResponse } from "../../Domain/DTOS/UserResponse";
import UserRepository from "../../Domain/Repositories/UserRepository";
import UserModel from '../../../config/Models/UserModel'
import { UserCreateRequest } from "../../Domain/DTOS/UserRequest";

export default class UserMongoRepository implements UserRepository {

    async CreateUser(user: UserCreateRequest): Promise<UserResponse | null> {
        try {
            const userFound = await this.findByName(user.name, '');
            if (userFound) {
                signale.error('✅ \x1b[1m\x1b[36m|\x1b[0m \x1b[35m¡Usuario ya agregado!\x1b[0m \x1b[1m\x1b[36m|\x1b[0m');
                return { message: 'Usuario ya existe', state: false }
            }
            const newUser = new UserModel(user);
            await newUser.save();
            return { message: 'Usuario agregado', state: true };
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    async CreateAdmin(user: UserCreateRequest): Promise<void> {
        const userFound = await this.findByName(user.name, '');

        if (!userFound) {
            await this.CreateAdmin(user);
            signale.success('✅ \x1b[1m\x1b[36m|\x1b[0m \x1b[35m¡Administrador agregado!\x1b[0m \x1b[1m\x1b[36m|\x1b[0m');
        }
    }

    private async findByName(name: string, select: string) {
        const user: any = await UserModel.find({ name: name }).select(select);
        if (user && user.length !== 0) {
            return user;
        }
        return false;
    }
}