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
import MQTTConection from './Adapters/MQTTConection'

dotenv.config();

const deviceMongoRepository = new DeviceMongoRepository();
const createDeviceUseCase = new CreateDeviceUseCase(deviceMongoRepository);
const getDevicesUseCase = new GetDevicesUseCase(deviceMongoRepository);

const WS_URI = process.env.WS_URI || 'ws://localhost:8000';
const webSocketService = new SocketConnection(WS_URI, getDevicesUseCase);
const triggerDeviceUseCase = new TriggerDeviceUseCase(deviceMongoRepository, webSocketService);

const options = {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD
}
const MQTT_URI = process.env.MQTT_URI || 'guest';
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'default';

const MQTT = new MQTTConection(MQTT_URI, options, MQTT_TOPIC, triggerDeviceUseCase, webSocketService)

const triggerDeviceController = new TriggerDeviceController(triggerDeviceUseCase, MQTT);
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
    getDevicesController,
    MQTT
}  