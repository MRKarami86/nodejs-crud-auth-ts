import { UserController } from "../controllers/userController";
import { userRepository } from "../repository/repository";
import { UserService } from "../service/service";

const userRepo = new userRepository();
const userService = new UserService(userRepo);
export const userController = new UserController(userService) ;