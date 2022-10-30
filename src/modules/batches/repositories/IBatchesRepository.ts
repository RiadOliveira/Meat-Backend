import Batch from 'typeorm/entities/Batch';
import { CreateBatchDTO } from '../dtos/CreateBatchDTO';
import { UpdateBatchDTO } from '../dtos/UpdateBatchDTO';

export interface IBatchesRepository {
    create(data: CreateBatchDTO): Promise<Batch>;
    save(data: UpdateBatchDTO): Promise<Batch>;
    findById(batchId: string): Promise<Batch | undefined>;
    findByIdWithRelations(id: string): Promise<Batch | undefined>;
    findAllFromCompany(companyId: string): Promise<Batch[]>;
    delete(BatchId: string): Promise<void>;
}
