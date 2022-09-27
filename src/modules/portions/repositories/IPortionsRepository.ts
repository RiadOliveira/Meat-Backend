import Portion from 'typeorm/entities/Portion';
import { CreatePortionDTO } from '../dtos/CreatePortionDTO';
import { UpdatePortionDTO } from '../dtos/UpdatePortionDTO';

export interface IPortionsRepository {
    create(data: CreatePortionDTO): Promise<Portion>;
    save(data: UpdatePortionDTO): Promise<Portion>;
    findById(id: string): Promise<Portion | undefined>;
    findAllFromBatch(batchId: string): Promise<Portion[]>;
    delete(portionId: string): Promise<void>;
}
