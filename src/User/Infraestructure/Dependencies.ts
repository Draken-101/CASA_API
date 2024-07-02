
import CreateUserUseCase from "../Application/UseCase/CreateUseCase";
import UserController from "./Controller/UserController";
import UserMongoRepository from "./Repositories/UserMongoRepository";
import CreateAdmin from '../Application/UseCase/CreateAdminUseCase'

const userMongoRepository = new UserMongoRepository();
const userCreateUseCase = new CreateUserUseCase(userMongoRepository);
const createAdminUseCase = new CreateAdmin(userMongoRepository)
const userController = new UserController(userCreateUseCase, createAdminUseCase);

export {
    userController
};