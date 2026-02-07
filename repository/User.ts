import mongoose , { Schema, Document, Model } from 'mongoose' 

export interface IUser extends Document{
    userName: string;
    email: string;
    password: string;
} 
const userSchema: Schema<IUser> = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;