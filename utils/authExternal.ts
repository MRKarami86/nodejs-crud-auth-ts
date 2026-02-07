export interface IAuthExternalService {
    generateToken(userId:string, email:string):Promise<string>;
}
export class AuthExternalService implements IAuthExternalService {
    async generateToken(userId: string, email: string): Promise<string> {
        console.log(`External servies generating token for uset :${email}`)

        return `MOCK_JWT_TOKEN_${userId}_${Date.now()}`;
    }
}