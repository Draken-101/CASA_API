import { DeviceTriggerRequest } from "../../Domain/DTOS/DeviceRequest";
import DeviceRepository from "../../Domain/Repositories/DeviceRepository";

export default class TriggerDeviceUseCase{
    constructor(private readonly deviceRepository: DeviceRepository) {}

    async execute(device: DeviceTriggerRequest){
        return await this.deviceRepository.TriggerDevice(device);
    }
}