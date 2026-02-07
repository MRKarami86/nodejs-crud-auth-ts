import { UserController } from "../controllers/userController";
import { userRepository } from "../repository/repository";
import { UserService } from "../service/service";
import { HashService } from "../externalService/HashService";
import { AuthExternalService, IAuthExternalService } from '../utils/authExternal';


const hashService = new HashService()
const userRepo = new userRepository();
const authExternal = new AuthExternalService();
const userService = new UserService(userRepo, hashService);
export const userController = new UserController(userService, authExternal) ;


