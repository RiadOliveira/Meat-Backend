import AppError from 'errors/AppError';
import Slaughter from 'typeorm/entities/Slaughter';
import SlaughterService from './SlaughterService';

interface UpdateSlaughterData {
    id: string;
    method: string;
    description: string;
}

export default class UpdateSlaughterService extends SlaughterService {
    public async execute(
        userId: string,
        updateSlaughterData: UpdateSlaughterData,
    ): Promise<Slaughter> {
        const findedSlaughter = await this.slaughterRepository.findById(
            updateSlaughterData.id,
        );
        if (!findedSlaughter) throw new AppError('Slaughter not found', 404);

        const findedBatch = await this.batchesRepository.findById(
            findedSlaughter.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const updatedSlaughter = await this.slaughterRepository.save({
            ...findedSlaughter,
            ...updateSlaughterData,
        });
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return updatedSlaughter;
    }
}
