import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';
import BatchService from './BatchService';

export default abstract class BatchRelatedEntityService extends BatchService {
    protected async validateBatchRelatedEntityOperation(
        batch: Batch,
        userId: string,
    ): Promise<void> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);

        if (batch.companyId !== findedUser.companyId) {
            throw new AppError("This batch is not one of users's company");
        }

        if (batch.endingDate) {
            throw new AppError('This batch is already finished');
        }
    }

    protected async updateIdOfUserThatMadeLastChangeOnBatch(
        batch: Batch,
        userId: string,
    ): Promise<void> {
        batch.idOfUserThatMadeLastChange = userId;
        await this.batchesRepository.save(batch);
    }
}
