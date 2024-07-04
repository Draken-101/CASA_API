
import DeviceRepository from "../../Domain/Repositories/DeviceRepository";
import { custom, customText } from "../../../config/Services/customSignale";
import DeviceModel from '../../../config/Models/DeviceModel';
import { DeviceCreateResponse, DeviceResponse, DeviceTriggerResponse } from "../../Domain/DTOS/DeviceResponse";
import { DeviceRequest } from "../../Domain/DTOS/DeviceRequest";
import { Request, Response } from "express";

export default class DeviceMongoRepository implements DeviceRepository {
    private Clients: Response[] = [];

    async GetRealTimeStatusDevices(req: Request, res: Response): Promise<void> {
        try {
            this.Clients.push(res);

            req.on('close', () => {
                this.Clients = this.Clients.filter(client => client !== res);
            })
            return;
        } catch (error) {
            custom.Error(error);
            return;
        }
    }

    async TriggerDevice(name: string): Promise<DeviceTriggerResponse> {
        try {
            const deviceFound = await this.findByName(name, 'name status');
            if (!deviceFound) {
                custom.Error(
                    "🌐" +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    customText.colors.magenta + '¡' + customText.end +
                    customText.bold + customText.colors.blanco + name + customText.end +
                    customText.colors.magenta + ', no esta en la base de datos!' + customText.end +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    "🌐"
                );
                return { triggerDevice: {}, success: false, message: '¡' + name + ', no esta en la base de datos!', };
            }

            await deviceFound.TriggerStatus();

            await deviceFound.save();

            this.sendTriggerToClients(deviceFound);

            custom.Success(
                "✅" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡' + customText.end +
                customText.bold + customText.colors.blanco + name + customText.end +
                customText.colors.magenta + ', se ah usado!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "✅"
            );

            return { triggerDevice: deviceFound, success: true, message: '¡' + name + ', se ah usado!', };
        } catch (error) {
            custom.Error(error);
            return { triggerDevice: {}, success: false, message: 'error en el servidor!', };
        }
    }

    private async sendTriggerToClients(device: DeviceResponse){
        this.Clients.map(client => {
            client.write(`event:Trigger\n`);
            client.write(`data:${JSON.stringify(device)}\n\n`); 
        });
    }

    async CreateDevice(device: DeviceRequest): Promise<DeviceCreateResponse> {
        try {
            const deviceFound = await this.findByName(device.name, '');
            if (deviceFound) {
                custom.Error(
                    "🌐" +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    customText.colors.magenta + '¡' + customText.end +
                    customText.bold + customText.colors.blanco + device.name + customText.end +
                    customText.colors.magenta + ' ya esta agregado!' + customText.end +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    "🌐"
                );
                return { newDevice: deviceFound, success: false, message: '¡' + device.name + ' Ya esta agregado!', };
            }
            const newDevice = new DeviceModel(device);
            await newDevice.save();
            custom.Success(
                "✅" + 
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡' + customText.end +
                customText.bold + customText.colors.blanco + device.name + customText.end +
                customText.colors.magenta + ' agregado exitosamente!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "✅"
            );
            return { newDevice: newDevice, success: true, message: '¡' + device.name + ' agregado exitosamente!', };
        } catch (error) {
            custom.Error(error);
            return { newDevice: {}, success: true, message: 'error en el servidor', };
        }
    }

    private async findByName(device: string, select: string) {
        const deviceFound = await DeviceModel.findOne({ name: device }).select(select).exec();
        if (deviceFound) {
            return deviceFound;
        }
        return false;
    }

    async GetDevices(): Promise<DeviceResponse[] | object> {
        try {
            const Devices = await DeviceModel.find().exec();

            custom.Success(
                "✅" +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + '¡Han pedido los dispositivos!' + customText.end +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                "✅"
            );
            return Devices;
        } catch (error) {
            custom.Error(error);
            return { message: '', status: false, success: false };
        }
    }
}