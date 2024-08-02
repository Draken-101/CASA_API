import express from 'express';
import { getActionController } from '../Dependencies';

const ActionRoutes = express();

    ActionRoutes.get('/', getActionController.run.bind(getActionController));

export default ActionRoutes;