import { userCreateUseCase } from "../../User/Infraestructure/Dependencies";
import { createDeviceUseCase } from '../../Devices/Infraestructure/Dependencies';
import RoleModel from "../Models/RoleModel";
import { custom, customText } from "./customSignale";
import * as dotenv from 'dotenv';
import DeviceModel from "../Models/DeviceModel";

dotenv.config();

const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN || "passwordAdmin123"

const Roles = ['admin', 'visita', 'padre', 'hijo', 'ladron'];
const Devices = [
    'Foco-Cuarto-1', 
    'Foco-Cuarto-2',
    'Foco-Pasillo-1',
    'Foco-Porton-1',
    'Foco-Porton-2',
    'Puerta-Cuarto-Entrada',
    'Puerta-Cuarto-Baño',
    'Porton',
    'Television',
    'Clima'
]

export default async function InicializateDB() {
    try {


        const roles = await RoleModel.find().exec();

        if (roles.length === 0) {
            Roles.map(async (role) => {
                const newRole = new RoleModel({
                    name: role
                });
                await newRole.save();
            })
            custom.Success(
                '🌐' +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + 'Roles creados exitosamente: ' + customText.end +
                customText.bold + customText.colors.blanco + Roles[0] +
                customText.colors.magenta + ', ' + customText.end +
                customText.bold + customText.colors.blanco + Roles[1] +
                customText.colors.magenta + ', ' + customText.end +
                customText.bold + customText.colors.blanco + Roles[2] +
                customText.colors.magenta + ', ' + customText.end +
                customText.bold + customText.colors.blanco + Roles[3] +
                customText.colors.magenta + ', ' + customText.end +
                customText.bold + customText.colors.blanco + Roles[4] + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                '🌐'
            )
        };

        const devices = await DeviceModel.find().exec();

        if (devices.length === 0) {
            Devices.map(async (device) => {
                await createDeviceUseCase.execute({name: device});
            })
        }

        await userCreateUseCase.execute({
            name: "Admin",
            email: "admin@example.com",
            password: PASSWORD_ADMIN,
            role: 'admin'
        });
    } catch (error) {
        custom.Error(error)
    }
}