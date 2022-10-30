import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import UserService from './UserService';

export default class FindUserByIdService extends UserService {
    public async execute(userId: string): Promise<User> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);

        return findedUser;
    }
}
