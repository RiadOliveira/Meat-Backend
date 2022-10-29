import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';

export default class ListBatchesFromCompanyService {
    private batchesRepository = new BatchesRepository();

    public async execute(companyId: string): Promise<Batch[]> {
        const findedBatches = await this.batchesRepository.findAllFromCompany(
            companyId,
        );

        return findedBatches;
    }
}
