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
        updatedPortionData: UpdatePortionData,
    ): Promise<Portion> {
        const findedPortion = await this.portionsRepository.findById(
            updatedPortionData.id,
        );
        if (!findedPortion) throw new AppError('Portion not found', 404);

        const { batch: findedBatch } = findedPortion;

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const updatedPortion = await this.portionsRepository.save(
            Object.assign(findedPortion, updatedPortionData),
        );
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return updatedPortion;
    }
}
