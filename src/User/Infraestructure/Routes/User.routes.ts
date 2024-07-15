import express from 'express';
import { loginController, userCreateController, verifyToken } from '../Dependencies';

export const  UserRoutes = express();

UserRoutes.post('/', verifyToken.run.bind(verifyToken), userCreateController.run.bind(userCreateController));

UserRoutes.post('/login', loginController.run.bind(loginController));