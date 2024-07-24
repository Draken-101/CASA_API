import CreateDeviceUseCase from "../Application/UseCase/CreateDeviceUseCase";
import DeviceMongoRepository from "./Adapters/DeviceMongoRepository";
import CreateDeviceController from "./Controller/CreateDeviceController";
import GetDevicesUseCase from '../Application/UseCase/GetDevicesUseCase';
import TriggerDeviceUseCase from '../Application/UseCase/TriggerDeviceUseCase';
import TriggerDeviceController from './Controller/TriggerDeviceController';
import SocketConnection from './Adapters/SocketConnnection';
import EmailConnection from './Adapters/EmailConnection';
import ValidateAction from './Middleware/ValidateAction'
import GetDevicesController from './Controller/GetDevicesController';
import * as dotenv from 'dotenv';

dotenv.config();

const deviceMongoRepository = new DeviceMongoRepository();
const createDeviceUseCase = new CreateDeviceUseCase(deviceMongoRepository);
const getDevicesUseCase = new GetDevicesUseCase(deviceMongoRepository);
const triggerDeviceUseCase = new TriggerDeviceUseCase(deviceMongoRepository);

const WS_URI = process.env.WS_URI || 'ws://localhost:8000';
const webSocketService = new SocketConnection(WS_URI, getDevicesUseCase);

const triggerDeviceController = new TriggerDeviceController(triggerDeviceUseCase, webSocketService);
const getDevicesController = new GetDevicesController(getDevicesUseCase);
const createDeviceController = new CreateDeviceController(createDeviceUseCase);

const emailConnection = new EmailConnection();
const validateAction = new ValidateAction(emailConnection);

export { 
    createDeviceController,
    createDeviceUseCase,
    triggerDeviceController,
    webSocketService,
    validateAction,
    getDevicesController
}  