
import CreateUserUseCase from "../Application/UseCase/CreateUseCase";
import UserMongoRepository from "./Repositories/UserMongoRepository";
import UserCreateController from "./Controller/UserCreateController";
import LoginUseCase from '../Application/UseCase/LoginUseCase';
import LoginController from './Controller/LoginController'
import AuthServices from "../Application/Services/Auth";
import VerifyToken from '../../Middleware/VerifyToken'
import * as dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET || "Secret";

const Auth = new AuthServices(SECRET);
const verifyToken = new VerifyToken(Auth);

const userMongoRepository = new UserMongoRepository();
const userCreateUseCase = new CreateUserUseCase(userMongoRepository);
const loginUseCase = new LoginUseCase(userMongoRepository, Auth);

const userCreateController = new UserCreateController(userCreateUseCase);
const loginController = new LoginController(loginUseCase);

export {
    userCreateController,
    userCreateUseCase,
    loginController,
    verifyToken
};