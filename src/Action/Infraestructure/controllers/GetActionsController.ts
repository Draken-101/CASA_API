import { Request, Response } from "express";
import GetActionsUseCase from "../../Application/UseCases/GetActionsUseCase";

export default class GetActionsController {
    constructor(private readonly getActions: GetActionsUseCase) { };
    async run(_req:Request, res:Response){
        const actions = await this.getActions.execute();
        res.json(actions);
        return;
    }
}