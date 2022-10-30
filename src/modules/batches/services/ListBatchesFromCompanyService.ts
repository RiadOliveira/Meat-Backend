import Batch from 'typeorm/entities/Batch';
import BatchService from './BatchService';

import { instanceToInstance } from 'class-transformer';

export default class ListBatchesFromCompanyService extends BatchService {
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
