import { NextFunction, Request, Response } from "express";
import { custom, customText } from "../../../config/Services/customSignale";
import RoleModel from "../../../config/Models/RoleModel";
import SenderEmail from "../../Domain/Ports/SenderEmail";

export default class ValidateAction{
    constructor( readonly client: SenderEmail){}

    async run(req:Request, _res:Response, next: NextFunction){
        try {
            const { roleUser, nameDevice } = req.body;

            const roleFound = await RoleModel.findOne({name: roleUser}); 
            console.log(roleFound);
            if (!roleFound) {
                this.client.sendEmail(nameDevice);
                custom.Intruso(
                    customText.bold + customText.colors.cyan + ' | ' + customText.end +
                    customText.colors.magenta + 'Usuario desconocido uso: ' + customText.end +
                    customText.bold + customText.colors.blanco + nameDevice + customText.end +
                    customText.bold + customText.colors.cyan + ' | ' + customText.end 
                )
            } 
            return next(); 
        } catch (error) {
            custom.Error(error);
            return;
        }
    }
}