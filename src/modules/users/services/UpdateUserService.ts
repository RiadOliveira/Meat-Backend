import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import UserService from './UserService';

interface UserData {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
    userId: string;
}

export default class UpdateUserService extends UserService {
    public async execute({
        name,
        email,
        oldPassword,
        newPassword,
        userId,
    }: UserData): Promise<User> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('Requested user does not exist');

        if (email !== findedUser.email) {
            const verifyEmail = await this.usersRepository.findByEmail(email);

            if (verifyEmail)
                throw new AppError(
                    'A user with the informed email already exists',
                );

            findedUser.email = email;
        }

        // Password update
        if (oldPassword && newPassword) {
            const verifyPassword = oldPassword === findedUser.password;
            if (!verifyPassword) {
                throw new AppError(
                    "Informed old password is not equal to user's original password",
                );
            }

            findedUser.password = newPassword;
        }

        findedUser.name = name;
        const updatedUser = this.usersRepository.save(findedUser);

        return updatedUser;
    }
}
