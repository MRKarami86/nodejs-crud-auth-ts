import { IHashService, IUserRepository } from "../../service/service";
import { IAuthExternalService } from "../../utils/authExternal";

export class AddUserDomain{
    constructor(
        private userRepo:IUserRepository,
        private hashService:IHashService,
        private externalValidationService?:IAuthExternalService
    )
}