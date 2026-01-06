import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserInfoWithoutId {
    userName:string;
    email:string;
}


export interface IUserWithPassword extends IUserInfoWithoutId {
 password:string
}

export interface IUserInfoWithId extends IUserWithPassword {
    id:string
}


 export interface IUserRepository {
    addUser (user: IUserWithPassword):Promise<void>;
    findByEmail(email:string):Promise<IUserInfoWithId>;
    findById(id: string): Promise<IUserInfoWithId>;
    updateUser(userId:string,data:IUserInfoWithoutId):Promise<void>;
    delete(userId:string):Promise<IUserInfoWithId>;
 }

export interface IHashService{
    hash(arg:string):Promise<string>
    compare(claimedPassword:string, actualPassword:string):Promise<void>
}


export class UserService {
    constructor (private userRepo: IUserRepository, private readonly hasService:IHashService){

    }
    addUser =async (user : IUserWithPassword)=>{
        const {userName, email, password} = user;

        
        await this.userRepo.addUser(user);
    }

    async login(email:string, password:string):Promise<string>{
        const user = await this.userRepo.findByEmail(email);

        if(!user){
            throw new Error('Invalid credetials');
        }

        
      this.hasService.compare(password, user.password)
        

        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(
            {userId:user.id},
            secret,
            {expiresIn:'1d'}
        )

        return token;
    }

    async update(userId:string,data:IUserWithPassword){
        const user = await this.userRepo.findById(userId);

        data.password = await bcrypt.hash(data.password,10);

        await this.userRepo.updateUser(userId,data);
    }

    async delete(userId:string){
        const user = await this.userRepo.delete(userId);

        if(!user){
            throw new Error('User not found or could not be deleted');
        }

        return user;
    }


}

