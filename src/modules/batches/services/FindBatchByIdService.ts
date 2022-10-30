import { instanceToInstance } from 'class-transformer';
import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';

export default class FindBatchByIdService {
    private batchesRepository = new BatchesRepository();

    public async execute(batchId: string): Promise<Batch> {
        const findedBatch = await this.batchesRepository.findByIdWithRelations(
            batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        findedBatch.userThatMadeLastChange = instanceToInstance(
            findedBatch.userThatMadeLastChange,
        );
        return findedBatch;
    }
}
