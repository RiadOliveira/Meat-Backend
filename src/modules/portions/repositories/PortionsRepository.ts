import Portion from 'typeorm/entities/Portion';

import { getRepository, Repository } from 'typeorm';
import { CreatePortionDTO } from '../dtos/CreatePortionDTO';
import { UpdatePortionDTO } from '../dtos/UpdatePortionDTO';
import { IPortionsRepository } from './IPortionsRepository';

class PortionsRepository implements IPortionsRepository {
    private portionsRepository: Repository<Portion>;

    constructor() {
        this.portionsRepository = getRepository(Portion);
    }

    public async create(portion: CreatePortionDTO): Promise<Portion> {
        const newPortion = this.portionsRepository.create(portion);
        await this.portionsRepository.save(newPortion);

        return newPortion;
    }

    public async save(portion: UpdatePortionDTO): Promise<Portion> {
        return this.portionsRepository.save(portion);
    }

    public async findById(id: string): Promise<Portion | undefined> {
        return this.portionsRepository.findOne({
            where: { id },
            relations: ['batch'],
        });
    }

    public async findAllFromBatch(batchId: string): Promise<Portion[]> {
        const findedPortions = await this.portionsRepository.find({
            where: {
                batchId,
            },
        });

        return findedPortions;
    }

    public async delete(portionId: string): Promise<void> {
        await this.portionsRepository.delete(portionId);
    }
}

export default PortionsRepository;
