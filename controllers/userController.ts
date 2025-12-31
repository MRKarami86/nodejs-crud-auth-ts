import {Request, Response} from 'express';
import { UserService } from '../service/service';
import { AuthRequest } from '../middleware/authMiddleware';


export class UserController{
    constructor(private userService:UserService){
        
    }
    register = async (req:Request, res:Response)   :Promise<void>=>{
        const {userName, email, password}:{
            userName : string;
            email : string;
            password: string;
        } = req.body;

        await this.userService.addUser({
            userName,
            email,
            password
        });
    
        res.json({message:'User Created'});
    };

    login= async (req:Request, res:Response):Promise<void>=>{
        const {email, password} = req.body;

        const token = await this.userService.login(email,password);

        res.json({token});
    }

    update = async (req:AuthRequest, res:Response):Promise<void> =>{
        const userId = req.userId;
        const {userName, email, password} = req.body;

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        await this.userService.update(userId,{userName, email, password});

        res.json({message:'User updated successfully'});
    }
}


