import Slaughter from 'typeorm/entities/Slaughter';

import { getRepository, Repository } from 'typeorm';
import { CreateSlaughterDTO } from '../dtos/CreateSlaughterDTO';
import { UpdateSlaughterDTO } from '../dtos/UpdateSlaughterDTO';
import { ISlaughterRepository } from './ISlaughterRepository';

class SlaughterRepository implements ISlaughterRepository {
    private slaughterRepository: Repository<Slaughter>;

    constructor() {
        this.slaughterRepository = getRepository(Slaughter);
    }

    public async create(slaughter: CreateSlaughterDTO): Promise<Slaughter> {
        const newSlaughter = this.slaughterRepository.create(slaughter);
        await this.slaughterRepository.save(newSlaughter);

        return newSlaughter;
    }

    public async save(slaughter: UpdateSlaughterDTO): Promise<Slaughter> {
        return this.slaughterRepository.save(slaughter);
    }

    public async findById(id: string): Promise<Slaughter | undefined> {
        return this.slaughterRepository.findOne({
            where: { id },
            relations: ['batch'],
        });
    }

    public async findAllFromBatch(batchId: string): Promise<Slaughter[]> {
        const findedSlaughters = await this.slaughterRepository.find({
            where: {
                batchId,
            },
        });

        return findedSlaughters;
    }

    public async delete(slaughterId: string): Promise<void> {
        await this.slaughterRepository.delete(slaughterId);
    }
}

export default SlaughterRepository;
