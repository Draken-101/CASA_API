
import { DeviceRequest } from "../../Domain/DTOS/DeviceRequest";
import DeviceRepository from "../../Domain/Repositories/DeviceRepository";

export default class CreateDeviceUseCase{
    constructor(private readonly deviceRepository: DeviceRepository) {}

    async execute(device: DeviceRequest){
        return await this.deviceRepository.CreateDevice(device);
    }
}