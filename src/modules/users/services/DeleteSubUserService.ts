import AppError from 'errors/AppError';
import { AccountType } from 'types/AccountType';
import UsersRepository from '../repositories/UsersRepository';

export default class DeleteSubUserService {
    private usersRepository = new UsersRepository();

    public async execute(producerId: string, userId: string): Promise<void> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) {
            throw new AppError('Requested user not found');
        }

        if (findedUser.accountType === AccountType.PRODUCER) {
            throw new AppError('An producer cannot be deleted by another user');
        }

        const findedProducer = await this.usersRepository.findById(producerId);
        if (!findedProducer) {
            throw new AppError('Requested producer not found');
        }

        if (findedProducer.accountType !== AccountType.PRODUCER) {
            throw new AppError(
                'Requested producer id does not reference a producer',
            );
        }

        if (findedUser.companyId !== findedProducer.companyId) {
            throw new AppError(
                'Producer does not have permission to delete requested user',
            );
        }

        await this.usersRepository.delete(userId);
    }
}