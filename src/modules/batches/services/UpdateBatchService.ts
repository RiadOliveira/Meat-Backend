import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';
import BatchesRepository from '../repositories/BatchesRepository';
import { AnimalType } from 'types/AnimalType';

interface UpdateBatchData {
    id: string;
    name: string;
    animal: AnimalType;
    race: string;
    city: string;
    state: string;
    endingDate?: Date;
}

export default class UpdateBatchService {
    private batchesRepository = new BatchesRepository();
    private usersRepository = new UsersRepository();

    public async execute(
        userId: string,
        updatedBatchData: UpdateBatchData,
    ): Promise<Batch> {
        const findedBatch = await this.batchesRepository.findById(
            updatedBatchData.id,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        if (findedBatch.endingDate) {
            throw new AppError('This batch is already finished');
        }

        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);

        const updatedBatch = await this.batchesRepository.save({
            ...findedBatch,
            ...updatedBatchData,
            idOfUserThatMadeLastChange: userId,
        });
        return updatedBatch;
    }
}
