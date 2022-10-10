import AppError from 'errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

export default class DeleteUserService {
    private usersRepository = new UsersRepository();

    public async execute(userId: string): Promise<void> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('Requested user not found');

        await this.usersRepository.delete(userId);
    }
}
