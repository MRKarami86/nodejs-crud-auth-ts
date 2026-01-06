import { IUser } from "../../repository/User";
import { UserService } from "../service";
import { IUserRepository } from "../service";


const mockUserRepository:jest.Mocked<IUserRepository>={
    addUser:jest.fn(),
    findByEmail:jest.fn(),
    findById:jest.fn(),
    delete:jest.fn()
};

// fake repository
const userService = new UserService(mockUserRepository);

describe('User Service - addUser',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it('should hash the Password and call the repository to add the user',async ()=>{
        const userData={
            userName:'testuser',
            email:'test@example.com',
            password:'plainpassword123'
        };

        const mockCreateUser:IUser = {
            _id:'some-mongo-id',
            userName:userData.userName,
            email:userData.email,
            password: 'hashedpassword'
        }as any;

        mockUserRepository.addUser.mockResolvedValue(mockCreateUser);

        const result = await userService.addUser(userData);

        expect(mockUserRepository.addUser).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.addUser).toHaveBeenCalledWith(
            expect.objectContaining({
                userName:'testUser',
                eamil:'test@example.com',
                password: expect.not.toBe('plainpassword123')
            })
        );
        expect(result).toEqual(mockCreateUser);
    });

     // تست حالت خطا (مثلا اگر ریپازیتوری خطا دهد)
    it('should throw an error if the repository fails to add the user', async () => {
        // Arrange
        const userData = { userName: 'testuser', email: 'test@example.com', password: 'password' };
        const errorMessage = 'Database error';
        
        // به Mock بگو وقتی addUser فراخوانی شد، یک خطا پرتاب کن
        mockUserRepository.addUser.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        // منتظر می‌مانیم که سرویس خطا پرتاب کند
        await expect(userService.addUser(userData)).rejects.toThrow(errorMessage);
    });
});



