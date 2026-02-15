import { IHashService, IUserRepository } from "../../service/service";
import { IAuthExternalService } from "../../utils/authExternal";

export class LoginDomain{
    constructor(
        private userRepo:IUserRepository,
        private hashService:IHashService,
        private authExternalServies:IAuthExternalService
    ){}

    async execute(email:string, password:string):Promise<string> {
        const user = await this.userRepo.findByEmail(email);

        if(!user){
            throw new Error('Invalid credentials');
        }

        const passwordIsValid = await this.hashService.compare(
            password,
            user.password
        );

        if(!passwordIsValid){
            throw new Error('Invalid credentials');
        }

        return this.authExternalServies.generateToken(
            user.id,
            user.email
        ); 
    }
}