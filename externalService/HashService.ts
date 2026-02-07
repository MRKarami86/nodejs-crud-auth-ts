import { IHashService } from "../service/service";
import bcrypt from "bcrypt"

export class HashService implements IHashService{
    private readonly saltRounds = 10; ///????

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }


    async compare(claimedPassword: string, actualPassword: string): Promise<boolean> {
        const isValid = await bcrypt.compare(claimedPassword, actualPassword);
        if(!isValid) throw new Error("you are not authenticated")
        
        return isValid;
    }

}

