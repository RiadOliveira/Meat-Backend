import AppError from 'errors/AppError';
import UserService from './UserService';

export default class DeleteUserService extends UserService {
    public async execute(userId: string): Promise<void> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('Requested user not found', 404);

        await this.usersRepository.delete(userId);
    }
}
