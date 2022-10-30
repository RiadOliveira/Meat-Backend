import AppError from 'errors/AppError';
import Slaughter from 'typeorm/entities/Slaughter';
import SlaughterService from './SlaughterService';

interface SlaughterData {
    method: string;
    description: string;
    batchId: string;
}

export default class CreateSlaughterService extends SlaughterService {
    public async execute(
        userId: string,
        slaughterData: SlaughterData,
    ): Promise<Slaughter> {
        const findedBatch = await this.batchesRepository.findById(
            slaughterData.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const createdSlaughter = await this.slaughterRepository.create(
            slaughterData,
        );
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return createdSlaughter;
    }
}
