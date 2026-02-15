import { UserController } from "../controllers/userController";
import { userRepository } from "../repository/repository";
import { UserService } from "../service/service";
import { HashService } from "../externalService/HashService";
import { AuthExternalService, IAuthExternalService } from '../utils/authExternal';


const hashService = new HashService()
const userRepo = new userRepository();
const authExternal = new AuthExternalService();

export const userController = new UserController(userService, authExternal) ;

const loginDomain = new LoginDomain(
    userRepo,
    hashService,
    AuthExternalService
)

export const userService = new UserService(LoginDomain);


