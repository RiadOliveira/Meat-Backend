import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';

export default class ValidateBatchRelatedEntityOperationService {
    private usersRepository = new UsersRepository();

    public async execute(batch: Batch, userId: string): Promise<void> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);

        if (batch.companyId !== findedUser.companyId) {
            throw new AppError("This batch is not one of users's company");
        }

        if (batch.endingDate) {
            throw new AppError('This batch is already finished');
        }
    }
}
