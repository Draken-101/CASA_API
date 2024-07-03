import DeviceRepository from "../../Domain/Repositories/DeviceRepository";

export default class TriggerDeviceUseCase{
    constructor(private readonly deviceRepository: DeviceRepository) {}

    async execute(name: string){
        return await this.deviceRepository.TriggerDevice(name);
    }
}