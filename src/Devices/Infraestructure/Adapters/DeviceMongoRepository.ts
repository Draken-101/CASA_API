
import DeviceRepository from "../../Domain/Ports/DeviceRepository";
import { custom } from "../../../config/Services/customSignale";
import DeviceModel from '../../../config/Models/DeviceModel';
import { DeviceCreateResponse, DeviceResponse, DeviceTriggerResponse } from "../../Domain/DTOS/DeviceResponse";
import { DeviceRequest, DeviceTriggerRequest } from "../../Domain/DTOS/DeviceRequest";

export default class DeviceMongoRepository implements DeviceRepository {

    async TriggerDevice(device: DeviceTriggerRequest): Promise<DeviceTriggerResponse> {
        try {
            const deviceFound = await this.findByName(device.nameDevice, 'nameDevice status');
            if (!deviceFound) {
                return { triggerDevice: {}, success: false, message: '¡No esta en la base de datos!', };
            }
 
            await deviceFound.TriggerStatus();

            await deviceFound.save();

            return { triggerDevice: deviceFound, success: true, message: '¡Se ah usado!', };
        } catch (error) {
            custom.Error(error);
            return { triggerDevice: {}, success: false, message: 'error en el servidor!', };
        }
    }

    async CreateDevice(device: DeviceRequest): Promise<DeviceCreateResponse> {
        try {
            const deviceFound = await this.findByName(device.nameDevice, '');
            if (deviceFound) {
                return { newDevice: deviceFound, success: false, message: '¡Ya esta agregado!', };
            }
            const newDevice = new DeviceModel(device);
            await newDevice.save();
            return { newDevice: newDevice, success: true, message: '¡Agregado exitosamente!', };
        } catch (error) {
            custom.Error(error);
            return { newDevice: {}, success: false, message: 'error en el servidor', };
        }
    }

    private async findByName(nameDevice: string, select: string) {
        const deviceFound = await DeviceModel.findOne({ nameDevice: nameDevice }).select(select).exec();
        if (deviceFound) {
            return deviceFound;
        }
        return false;
    }

    async GetDevices(): Promise<DeviceResponse[] | object> {
        try {
            const Devices = await DeviceModel.find().exec();
            return Devices;
        } catch (error) {
            custom.Error(error);
            return { message: '', status: false, success: false };
        }
    }
} 