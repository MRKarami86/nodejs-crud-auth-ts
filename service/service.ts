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
    addUser(user: IUserWithPassword): Promise<void>;
    findByEmail(email: string): Promise<IUserInfoWithId | null>;  // ← اضافه کردن | null
    findById(id: string): Promise<IUserInfoWithId | null>;        // ← اضافه کردن | null
    updateUser(userId: string, data: Partial<IUserWithPassword>): Promise<void>;
    delete(userId: string): Promise<IUserInfoWithId | null>;      // ← اضافه کردن | null
}

export interface IHashService{
    hash(arg:string):Promise<string>
    compare(claimedPassword:string, actualPassword:string):Promise<boolean>  // change To boolean type
}


export class UserService {
    constructor (private userRepo: IUserRepository, private readonly hasService:IHashService){

    }
    addUser =async (user : IUserWithPassword)=>{
        const {userName, email, password} = user;

        
        await this.userRepo.addUser(user);
    }

    async login(email:string, password:string):Promise<{
        user: IUserInfoWithoutId;
        tokenData:{userId:string, email:string}
    }>{
        const user = await this.userRepo.findByEmail(email);

        if(!user){
            throw new Error('Invalid credetials');
        }

        return {
            user: user,
            tokenData : {userId: user.id, email: user.email}};

       
    }

    async update(userId:string,data:IUserWithPassword){
        const user = await this.userRepo.findById(userId);
        if(!user) throw new Error('User not found');

        
        const isMatch = await this.hasService.compare(data.password, user.password);
        if(!isMatch) throw new Error('Current Password incorrect');

        if(data.userName){
            if(data.userName.length < 5){
                throw new Error('Username must be at least 5 characters long');
            }
        }

        if(data.email){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(data.email)){
                throw new Error('Invalid email format');
            }
        }

        if(data.password){
            if(data.password.length < 10){
                throw new Error('Password must be at least 10 characters long');
            }
            data.password = await bcrypt.hash(data.password,10);
        }

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

