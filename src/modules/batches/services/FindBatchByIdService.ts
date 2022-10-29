import { instanceToInstance } from 'class-transformer';
import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';

export default class FindBatchByIdService {
    private batchesRepository = new BatchesRepository();

    public async execute(batchId: string): Promise<Batch> {
        const findedBatch = await this.batchesRepository.findById(batchId);
        if (!findedBatch) throw new AppError('Batch not found');

        findedBatch.userThatMadeLastChange = instanceToInstance(
            findedBatch.userThatMadeLastChange,
        );
        return findedBatch;
    }
}
