import { UserController } from "../controllers/userController";
import { userRepository } from "../repository/repository";
import { UserService } from "../service/service";
import { HashService } from "../externalService/HashService";


const hashService = new HashService()
const userRepo = new userRepository();
const userService = new UserService(userRepo, hashService);
export const userController = new UserController(userService) ;