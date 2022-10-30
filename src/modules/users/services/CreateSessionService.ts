import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import UserService from './UserService';

interface UserData {
    email: string;
    password: string;
}

export default class CreateSessionService extends UserService {
    public async execute({ email, password }: UserData): Promise<User> {
        const loginErrorMessage = 'Incorrect e-mail or password';

        const findedUser = await this.usersRepository.findByEmail(email);
        if (!findedUser) throw new AppError(loginErrorMessage);

        const verifyPassword = password === findedUser.password;
        if (!verifyPassword) throw new AppError(loginErrorMessage);

        return findedUser;
    }
}
