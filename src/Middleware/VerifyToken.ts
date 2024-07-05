import { NextFunction, Request, Response } from "express";
import { custom } from "../config/Services/customSignale";
import AuthServices from "./Services/Auth";
import UserModel from '../config/Models/UserModel'

export default class VerifyToken {
    constructor(private readonly auth: AuthServices) { }

    async run(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['token'] || "";
            const { nameUser } = req.body;

            if (!token) {
                return res.status(403).send('Falta token');
            }

            const result = this.auth.ValidateToken(token.toString()) ;

            if (!result) {
                return res.status(403).send('No hay token');
            }

            const user = await UserModel.findOne({ name: nameUser }).select('password role').exec();


            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }

            if (user?.role !== "admin") {
                return res.status(403).send('No eres administrador');
            }

            return next();

        } catch (error) {
            custom.Error(error);
        }
    }
}