import BatchesRepository from '@modules/batches/repositories/BatchesRepository';
import UpdateIdOfUserThatMadeLastChangeOnBatchService from '@modules/batches/services/UpdateIdOfUserThatMadeLastChangeOnBatchService';
import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import Portion from 'typeorm/entities/Portion';
import PortionsRepository from '../repositories/PortionsRepository';

interface UpdatePortionData {
    id: string;
    name: string;
    portionBatch: string;
}

export default class UpdatePortionService {
    private portionsRepository = new PortionsRepository();
    private batchesRepository = new BatchesRepository();

    private updateIdOfUserThatMadeLastChangeOnBatchService =
        new UpdateIdOfUserThatMadeLastChangeOnBatchService();
    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

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

        await this.validateBatchRelatedEntityOperationService.execute(
            findedBatch,
            userId,
        );

        const updatedPortion = await this.portionsRepository.save({
            ...findedPortion,
            ...updatePortionData,
        });

        await this.updateIdOfUserThatMadeLastChangeOnBatchService.execute(
            findedBatch,
            userId,
        );

        return updatedPortion;
    }
}
