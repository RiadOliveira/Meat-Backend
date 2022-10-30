import AppError from 'errors/AppError';
import { validateBatchAction } from '../utils/validateBatchAction';
import BatchService from './BatchService';

export default class DeleteBatchService extends BatchService {
    public async execute(batchId: string, userId: string): Promise<void> {
        const findedBatch = await this.batchesRepository.findById(batchId);
        if (!findedBatch) throw new AppError('Batch not found', 404);

        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);
        validateBatchAction(findedUser, 'delete');

        await this.batchesRepository.delete(findedBatch.id);
    }
}
