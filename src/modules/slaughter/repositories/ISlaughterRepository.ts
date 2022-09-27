import Slaughter from 'typeorm/entities/Slaughter';
import { CreateSlaughterDTO } from '../dtos/CreateSlaughterDTO';
import { UpdateSlaughterDTO } from '../dtos/UpdateSlaughterDTO';

export interface ISlaughterRepository {
    create(data: CreateSlaughterDTO): Promise<Slaughter>;
    save(data: UpdateSlaughterDTO): Promise<Slaughter>;
    findById(id: string): Promise<Slaughter | undefined>;
    findAllFromBatch(batchId: string): Promise<Slaughter[]>;
    delete(slaughterId: string): Promise<void>;
}
