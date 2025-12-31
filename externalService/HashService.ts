import { IHashService } from "../service/service";
import bcrypt from "bcrypt"

export class HashService implements IHashService{
    hash(arg: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async compare(claimedPassword: string, actualPassword: string): Promise<void> {
        const isValid = await bcrypt.compare(claimedPassword, actualPassword);
        if(!isValid) throw new Error("you are not authenticated")
    }

}