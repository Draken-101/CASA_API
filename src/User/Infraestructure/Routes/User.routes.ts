import express from 'express';
import { userController } from '../Dependencies';

export const UserRoutes = express();

UserRoutes.post('/', userController.run.bind(userController));