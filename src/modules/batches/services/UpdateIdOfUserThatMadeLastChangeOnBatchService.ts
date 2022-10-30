import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';

export default class UpdateIdOfUserThatMadeLastChangeOnBatchService {
    private batchesRepository = new BatchesRepository();

    public async execute(batch: Batch, userId: string): Promise<void> {
        batch.idOfUserThatMadeLastChange = userId;
        await this.batchesRepository.save(batch);
    }
}
