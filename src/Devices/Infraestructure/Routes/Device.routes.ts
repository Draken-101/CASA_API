import express from 'express';
import { createDeviceController, triggerDeviceController, validateAction } from '../Dependencies'
import { verifyToken } from '../../../User/Infraestructure/Dependencies';

const DeviceRouter = express();

DeviceRouter.post('/', verifyToken.run.bind(verifyToken), createDeviceController.run.bind(createDeviceController));

DeviceRouter.post('/trigger', validateAction.run.bind(validateAction), triggerDeviceController.run.bind(triggerDeviceController));


export default DeviceRouter;
 