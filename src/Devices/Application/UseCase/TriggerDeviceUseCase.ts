import { DeviceTriggerRequest } from "../../Domain/DTOS/DeviceRequest";
import DeviceRepository from "../../Domain/Ports/DeviceRepository";
import SocketRepository from "../../Domain/Ports/SocketRepository";

export default class TriggerDeviceUseCase {
    constructor(private readonly deviceRepository: DeviceRepository, private readonly socket: SocketRepository) { }

    async execute(device: DeviceTriggerRequest) {
        const result = await this.deviceRepository.TriggerDevice(device);
        if (result.success) {
            console.log("Mandando triggers socket");
            this.socket.sendAction({ event: 'newAction', data: { user: device.nameUser, role: device.roleUser, device: device.nameDevice } })
            this.socket.sendTrigger({ ...result, event: 'Trigger', user: device.nameUser, role: device.roleUser });
        } 
        return result; 
    }
}   