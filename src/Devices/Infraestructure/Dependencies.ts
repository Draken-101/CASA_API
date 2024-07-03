import CreateDeviceUseCase from "../Application/UseCase/CreateDeviceUseCase";
import DeviceMongoRepository from "./Repositories/DeviceMongoRepository";
import CreateDeviceController from "./Controller/CreateDeviceController";
import GetDevicesUseCase from '../Application/UseCase/GetDevicesUseCase'
import GetDevicesController from './Controller/GetDevicesController'
import TriggerDeviceUseCase from '../Application/UseCase/TriggerDeviceUseCase'
import TriggerDeviceController from './Controller/TriggerDeviceController'

const deviceMongoRepository = new DeviceMongoRepository();

const createDeviceUseCase = new CreateDeviceUseCase(deviceMongoRepository);
const getDevicesUseCase = new GetDevicesUseCase(deviceMongoRepository);
const triggerDeviceUseCase = new TriggerDeviceUseCase(deviceMongoRepository);

const triggerDeviceController = new TriggerDeviceController(triggerDeviceUseCase);
const createDeviceController = new CreateDeviceController(createDeviceUseCase);
const getDevicesController = new GetDevicesController(getDevicesUseCase);

export {
    createDeviceController,
    createDeviceUseCase,
    getDevicesController,
    triggerDeviceController
}