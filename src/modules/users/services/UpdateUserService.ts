import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import { AccountType } from 'types/AccountType';
import UserService from './UserService';

interface UpdateUserData {
    name: string;
    email: string;
    userId: string;
    accountType: AccountType;
    oldPassword?: string;
    password?: string;
}

export default class UpdateUserService extends UserService {
    public async execute({
        name,
        email,
        oldPassword,
        password,
        accountType,
        userId,
    }: UpdateUserData): Promise<User> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found');

        if (
            findedUser.accountType !== AccountType.PRODUCER &&
            accountType !== AccountType.PRODUCER
        ) {
            findedUser.accountType = accountType;
        }

        if (email !== findedUser.email) {
            const verifyEmail = await this.usersRepository.findByEmail(email);

            if (verifyEmail)
                throw new AppError(
                    'A user with the informed email already exists',
                );

            findedUser.email = email;
        }

        // Password update
        if (oldPassword && password) {
            const verifyPassword = oldPassword === findedUser.password;
            if (!verifyPassword) {
                throw new AppError(
                    "Informed old password is not equal to user's original password",
                );
            }

            findedUser.password = password;
        }

        findedUser.name = name;
        const updatedUser = this.usersRepository.save(findedUser);

        return updatedUser;
    }
}
