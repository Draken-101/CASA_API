import UserUseCase from "../Application/UseCase/UserUseCase";
import UserController from "./Controller/UserController";
import UserMongoRepository from "./Repositories/UserMongoRepository";

const userMongoRepository = new UserMongoRepository();
const userUseCase = new UserUseCase(userMongoRepository);
const userController = new UserController(userUseCase);

export {
    userController
};