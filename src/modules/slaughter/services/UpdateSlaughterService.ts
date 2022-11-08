import AppError from 'errors/AppError';
import Slaughter from 'typeorm/entities/Slaughter';
import SlaughterService from './SlaughterService';

interface UpdateSlaughterData {
    id: string;
    method: string;
    description: string;
    slaughterDate: Date;
}

export default class UpdateSlaughterService extends SlaughterService {
    public async execute(
        userId: string,
        updatedSlaughterData: UpdateSlaughterData,
    ): Promise<Slaughter> {
        const findedSlaughter = await this.slaughterRepository.findById(
            updatedSlaughterData.id,
        );
        if (!findedSlaughter) throw new AppError('Slaughter not found', 404);

        const { batch: findedBatch } = findedSlaughter;

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const updatedSlaughter = await this.slaughterRepository.save(
            Object.assign(findedSlaughter, updatedSlaughterData),
        );
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return updatedSlaughter;
    }
}
