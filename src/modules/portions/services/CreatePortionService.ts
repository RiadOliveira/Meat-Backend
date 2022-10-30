import AppError from 'errors/AppError';
import Portion from 'typeorm/entities/Portion';
import PortionService from './PortionService';

interface PortionData {
    name: string;
    portionBatch: string;
    batchId: string;
}

export default class CreatePortionService extends PortionService {
    public async execute(
        userId: string,
        portionData: PortionData,
    ): Promise<Portion> {
        const findedBatch = await this.batchesRepository.findById(
            portionData.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const createdPortion = await this.portionsRepository.create(
            portionData,
        );
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return createdPortion;
    }
}
