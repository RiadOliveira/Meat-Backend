import AppError from 'errors/AppError';
import Batch from 'typeorm/entities/Batch';

import { AnimalType } from 'types/AnimalType';
import { validateBatchAction } from '../utils/validateBatchAction';
import BatchService from './BatchService';

interface BatchData {
    name: string;
    creationDate: Date;
    animal: AnimalType;
    race: string;
    city: string;
    state: string;
}

export default class CreateBatchService extends BatchService {
    public async execute(userId: string, batchData: BatchData): Promise<Batch> {
        const findedUser = await this.usersRepository.findById(userId);
        if (!findedUser) throw new AppError('User not found', 404);
        validateBatchAction(findedUser, 'create');

        const { id: batchId } = await this.batchesRepository.create({
            ...batchData,
            companyId: findedUser.companyId,
            idOfUserThatMadeLastChange: userId,
        });

        const findedBatch =
            await this.batchesRepository.findByIdWithUserThatMadeLastChange(
                batchId,
            );
        return findedBatch!;
    }
}
