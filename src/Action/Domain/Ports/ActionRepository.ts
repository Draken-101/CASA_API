import { Action } from "../DTOS/Action";

export default interface ActionRepository {
    GetActions():Promise<Action[] | null>;
}