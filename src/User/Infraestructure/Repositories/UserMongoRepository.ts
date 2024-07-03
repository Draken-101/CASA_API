import { UserLoginResponse, UserResponse } from "../../Domain/DTOS/UserResponse";
import UserRepository from "../../Domain/Repositories/UserRepository";
import UserModel from '../../../config/Models/UserModel'
import { UserCreateRequest, UserLoginRequest } from "../../Domain/DTOS/UserRequest";
import { custom, customText } from "../../../config/Services/customSignale";
import RoleModel from "../../../config/Models/RoleModel";

export default class UserMongoRepository implements UserRepository {

    async CreateUser(user: UserCreateRequest): Promise<UserResponse> {
        try {
            const userFound = await this.findByName(user.name, '');
            if (userFound) {
                if (user.name !== 'Admin') {
                    custom.Error(
                        "🌐" +
                        customText.bold + customText.colors.cyan + ' | ' + customText.end +
                        customText.colors.magenta + '¡' + customText.end +
                        customText.bold + customText.colors.blanco + user.name + customText.end +
                        customText.colors.magenta + ' ya esta agregado!' + customText.end +
                        customText.bold + customText.colors.cyan + ' | ' + customText.end +
                        "🌐"
                    );
                }
                return { message: `${user.name} ya existe`, state: false };
            }

            const passValidation = await this.validateUser(user.name, user.password, user.role); 

            if (!passValidation.state && passValidation.message) {
                return { message: passValidation.message, state: false };
            }

            const newUser = new UserModel({ 
                ...user,
                password: await UserModel.EncriptPassword(user.password),
                role: user.role || 'visita'
            });
            await newUser.save();
            custom.Success(
                "✅" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡' + customText.end +
                customText.bold + customText.colors.blanco + user.name + customText.end +
                customText.colors.magenta + ' agregado!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "✅"
            );
            return { message: `${user.name} agregado`, state: true };
        } catch (error) {
            custom.Error(error);
            return { message: 'Ocurrio un error en el servidor', state: false };
        }
    }

    async Login(user: UserLoginRequest): Promise<UserLoginResponse> {
        try {
            const userFound = await this.findByName(user.name, '');

            if (!userFound) {
                custom.Login(
                    "🛑" +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    customText.colors.magenta + '¡' + customText.end +
                    customText.bold + customText.colors.blanco + user.name + customText.end +
                    customText.colors.magenta + ' no existe en la base de datos!' + customText.end +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    "🛑"
                );
                return { message: `${user.name} no existe en la base de datos`, state: false, token: '' };
            }

            const validatePassword = await userFound.ComparedPassword(user.password);

            if (!validatePassword) {
                custom.Login(
                    "🛑" +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    customText.colors.magenta + '¡' + customText.end +
                    customText.bold + customText.colors.blanco + user.name + customText.end +
                    customText.colors.magenta + ' no ingreso la contraseña correcta!' + customText.end +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    "🛑"
                );
                return { message: 'Contraseña incorrecta', state: false, token: '' };
            }

            custom.Login(
                "✅" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡' + customText.end +
                customText.bold + customText.colors.blanco + user.name + customText.end +
                customText.colors.magenta + ' ha iniciado sesion!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "✅"
            );

            return { message: 'Sesion iniciada con exito', state: true, token: '' };
        } catch (error) {
            return { message: 'Ocurrio un error en el servidor', state: false, token: '' };
        }
    }

    private async findByName(name: string, select: string) {
        const user = await UserModel.findOne({ name: name }).select(select).exec();
        if (user) {
            return user;
        }
        return false;
    }

    private async validateUser(name: string, password: string, roleUser: string) {

        const roleFound = await RoleModel.findOne({ name: roleUser }).select('name').exec();

        if (password.length < 8) {
            custom.Error(
                "🌐" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡' + customText.end +
                customText.bold + customText.colors.blanco + name + customText.end +
                customText.colors.magenta + ', password no valida!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "🌐"
            ); 
            return { message: 'Contraseña debe tener almenos 8 caracteres', state: false };
        } 

        if (!roleFound) {
            custom.Error(
                "🌐" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡Rol: ' + customText.end +
                customText.bold + customText.colors.blanco + roleUser + customText.end +
                customText.colors.magenta + ' no existe!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "🌐"
            );
            return { message: `Rol: ${roleUser} no existe!`, state: false };
        }

        return { state: true };
    }
}