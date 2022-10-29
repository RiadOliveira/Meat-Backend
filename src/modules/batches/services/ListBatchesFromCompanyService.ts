import { instanceToInstance } from 'class-transformer';
import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';

export default class ListBatchesFromCompanyService {
    private batchesRepository = new BatchesRepository();

    public async execute(companyId: string): Promise<Batch[]> {
        const findedBatches = await this.batchesRepository.findAllFromCompany(
            companyId,
        );

        findedBatches.forEach(batch => {
            batch.userThatMadeLastChange = instanceToInstance(
                batch.userThatMadeLastChange,
            );
        });

        return findedBatches;
    }
}
