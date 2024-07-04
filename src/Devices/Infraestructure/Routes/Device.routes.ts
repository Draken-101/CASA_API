import express from 'express';
import { createDeviceController, getDevicesController, getRealTimeStatusDevicesController, triggerDeviceController } from '../Dependencies'
import { verifyToken } from '../../../User/Infraestructure/Dependencies';

const DeviceRouter = express();

DeviceRouter.post('/', verifyToken.run.bind(verifyToken), createDeviceController.run.bind(createDeviceController));

DeviceRouter.post('/trigger', verifyToken.run.bind(verifyToken), triggerDeviceController.run.bind(triggerDeviceController));

DeviceRouter.get('/', getDevicesController.run.bind(getDevicesController));

DeviceRouter.get('/realTimeStatusDevices', getRealTimeStatusDevicesController.run.bind(getRealTimeStatusDevicesController));

export default DeviceRouter;
