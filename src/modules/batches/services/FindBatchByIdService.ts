import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';
import BatchService from './BatchService';

import { instanceToInstance } from 'class-transformer';

export default class FindBatchByIdService extends BatchService {
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
