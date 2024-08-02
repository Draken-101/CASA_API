import ActionModel from "../../../config/Models/ActionModel";
import { Action } from "../../Domain/DTOS/Action";
import ActionRepository from "../../Domain/Ports/ActionRepository";

export class ActionMongoRepository implements ActionRepository{
    async GetActions(): Promise<Action[] | null> {
        try {
            const actions = await ActionModel.find();
            return actions;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}