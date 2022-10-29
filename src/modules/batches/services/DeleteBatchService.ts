import AppError from 'errors/AppError';
import BatchesRepository from '../repositories/BatchesRepository';

export default class DeleteBatchService {
    private batchesRepository = new BatchesRepository();

    public async execute(batchId: string): Promise<void> {
        const findedBatch = await this.batchesRepository.findById(batchId);
        if (!findedBatch) throw new AppError('Batch not found');

        await this.batchesRepository.delete(findedBatch.id);
    }
}
