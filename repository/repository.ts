import { IUserWithPassword, IUserInfoWithId, IUserRepository } from '../service/service';
import User from './User';

export class userRepository implements IUserRepository {
    
    async addUser(user: IUserWithPassword): Promise<void> {
        await User.create(user);
    }

    async findByEmail(email: string): Promise<IUserInfoWithId | null> {
        return User.findOne({ email });
    }

    async findById(id: string): Promise<IUserInfoWithId | null> {
        return User.findById(id);
    }

    async updateUser(userId: string, data: Partial<IUserWithPassword>): Promise<void> {
        const result = await User.findByIdAndUpdate(
            userId,
            data,
            { new: true }  // برگردوندن رکورد جدید بعد از آپدیت
        );
        
        if (!result) {
            throw new Error('User not found');
        }
    }

    async delete(userId: string): Promise<IUserInfoWithId | null> {
        return User.findByIdAndDelete(userId);;
    }
}
