import {IUserWithPassword, IUserInfoWithId} from '../service/service'
import User from './User'

export class userRepository implements IUserInfoWithId {
    async addUser(user: IUserWithPassword): Promise<void> {
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

    async deleteUser(id:string){
        return User.findByIdAndUpdate(id);
    }

}
