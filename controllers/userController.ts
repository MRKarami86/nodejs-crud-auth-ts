import User from '../models/User';

import bcrypt from 'bcrypt';

import {createToken} from '../utils/jwt';

import {Request, Response} from 'express';

interface AuthRequest extends Request{
    userId?:string;
}

export const register = async (req:Request, res:Response):Promise<void>=>{
    const {username, email, password}:{
        username : string;
        email : string;
        password: string;
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        email,
        password:hashedPassword
    });

    res.json({message:'User Created'});
};

export const login = async (req:Request, res:Response):Promise<void> =>{
    const {email, password}:{email:string , password: string} = req.body;

    const user = await User.findOne({email});

    if(!user){
        res.status(401).json({message: 'Invalid login - User'});
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        res.status(401).json({message: 'Invalid Login'});
        return;
    }

    const token = createToken(user._id.toString());

    res.json({token});
};

export const deleteProfile = async(
    req: AuthRequest,
    res: Response
):Promise<void> =>{
    if(!req.userId){
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'User deleted successfully' });
};




