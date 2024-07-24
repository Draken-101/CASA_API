import express from 'express';
import { createDeviceController, getDevicesController, triggerDeviceController, validateAction } from '../Dependencies'
import { verifyToken } from '../../../User/Infraestructure/Dependencies';

const DeviceRouter = express();

DeviceRouter.post('/', verifyToken.run.bind(verifyToken), createDeviceController.run.bind(createDeviceController));

DeviceRouter.post('/trigger', validateAction.run.bind(validateAction), triggerDeviceController.run.bind(triggerDeviceController));

DeviceRouter.get('/', getDevicesController.run.bind(getDevicesController));


export default DeviceRouter;
 