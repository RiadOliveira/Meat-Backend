import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';
import { AnimalType } from 'types/AnimalType';

interface BatchData {
    name: string;
    creationDate: Date;
    animal: AnimalType;
    race: string;
    city: string;
    state: string;
}

export default class CreateBatchService {
    private batchesRepository = new BatchesRepository();
    private usersRepository = new UsersRepository();

    public async execute(userId: string, batchData: BatchData): Promise<Batch> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);

        const createdBatch = await this.batchesRepository.create({
            ...batchData,
            companyId: findedUser.companyId,
            idOfUserThatMadeLastChange: userId,
        });
        return createdBatch;
    }
}
