import { NextFunction, Request, Response } from "express";
import { custom } from "../../../config/Services/customSignale";
import RoleModel from "../../../config/Models/RoleModel";

export default class ValidateAction{

    async run(req:Request, res:Response, next: NextFunction){
        try {
            const { roleUser } = req.body;

            const roleFound = await RoleModel.findOne(roleUser);

            if (!roleFound) {
                custom
            }
        } catch (error) {
            custom.Error(error);
            return;
        }
    }
}