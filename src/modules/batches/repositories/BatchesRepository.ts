import Batch from 'typeorm/entities/Batch';

import { getRepository, Repository } from 'typeorm';
import { CreateBatchDTO } from '../dtos/CreateBatchDTO';
import { UpdateBatchDTO } from '../dtos/UpdateBatchDTO';
import { IBatchesRepository } from './IBatchesRepository';

class BatchesRepository implements IBatchesRepository {
    private batchesRepository: Repository<Batch>;

    constructor() {
        this.batchesRepository = getRepository(Batch);
    }

    public async create(batch: CreateBatchDTO): Promise<Batch> {
        const newBatch = this.batchesRepository.create(batch);
        await this.batchesRepository.save(newBatch);

        return newBatch;
    }

    public async save(batch: UpdateBatchDTO): Promise<Batch> {
        return this.batchesRepository.save(batch);
    }

    public async findById(id: string): Promise<Batch | undefined> {
        return this.batchesRepository.findOne(id);
    }

    public async findByIdWithRelations(id: string): Promise<Batch | undefined> {
        return this.batchesRepository.findOne({
            where: { id },
            relations: [
                'userThatMadeLastChange',
                'vaccinations',
                'portions',
                'slaughter',
            ],
        });
    }

    public async findAllFromCompany(companyId: string): Promise<Batch[]> {
        const findedBatches = await this.batchesRepository.find({
            where: {
                companyId,
            },
            relations: ['userThatMadeLastChange'],
        });

        return findedBatches;
    }

    public async delete(batchId: string): Promise<void> {
        await this.batchesRepository.delete(batchId);
    }
}

export default BatchesRepository;
