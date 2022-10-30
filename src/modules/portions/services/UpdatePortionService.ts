import AppError from 'errors/AppError';
import Portion from 'typeorm/entities/Portion';
import PortionService from './PortionService';

interface UpdatePortionData {
    id: string;
    name: string;
    portionBatch: string;
}

export default class UpdatePortionService extends PortionService {
    public async execute(
        userId: string,
        updatePortionData: UpdatePortionData,
    ): Promise<Portion> {
        const findedPortion = await this.portionsRepository.findById(
            updatePortionData.id,
        );
        if (!findedPortion) throw new AppError('Portion not found', 404);

        const findedBatch = await this.batchesRepository.findById(
            findedPortion.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const updatedPortion = await this.portionsRepository.save({
            ...findedPortion,
            ...updatePortionData,
        });
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return updatedPortion;
    }
}
