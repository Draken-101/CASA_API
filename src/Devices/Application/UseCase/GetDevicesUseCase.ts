
import DeviceRepository from "../../Domain/Ports/DeviceRepository";

export default class GetDevicesUseCase {
    constructor(private readonly deviceRepository: DeviceRepository) { }

    async execute(){
        return await this.deviceRepository.GetDevices();
    }
}