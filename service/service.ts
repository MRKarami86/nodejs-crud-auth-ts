import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserInfo {
    userName:string;
    email:string;
    password : string;
}
 export interface IUserRepository {
    addUser (user: IUserInfo):Promise<void>;
    findByEmail(email:string):Promise<any>;
    findById(id: string): Promise<any>;
 }


export class UserService {
    constructor (private userRepo: IUserRepository){

    }
    addUser =async (user : IUserInfo)=>{
        const {userName, email, password} = user;

        //hash
        await this.userRepo.addUser(user);
    }

    async login(email:string, password:string):Promise<string>{
        const user = await this.userRepo.findByEmail(email);

        if(!user){
            throw new Error('Invalid credetials');
        }

        const isPasswordVlid = await bcrypt.compare(password, user.password);

        if(!isPasswordVlid){
            throw new Error('Invalid credetials');
        }

        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(
            {userId:user._id},
            secret,
            {expiresIn:'1d'}
        )

        return token;
    }
}

