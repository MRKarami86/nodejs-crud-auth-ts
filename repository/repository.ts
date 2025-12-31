import {IUserInfo, IUserRepository } from '../service/service'
import User from './User'

export class userRepository implements IUserRepository {
    async addUser(user: IUserInfo): Promise<void> {
        await User.create(user);
    }

    async findByEmail(email:string){
        return User.findOne({email});
    }

    async findById(id:string){
        return User.findById(id);
    }

    async updateUser(id:string,data:any){
        return User.findByIdAndUpdate(id,data);
    }

}
