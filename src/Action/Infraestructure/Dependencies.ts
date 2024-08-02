import GetActionsUseCase from "../Application/UseCases/GetActionsUseCase";
import { ActionMongoRepository } from "./Adapters/ActionMongoRepository";
import GetActionsController from "./controllers/GetActionsController";

const actionMongoRepository = new ActionMongoRepository();
const getActionsUseCase = new GetActionsUseCase(actionMongoRepository);
const getActionController = new GetActionsController(getActionsUseCase);

export {
    getActionController
}