import BatchesRepository from '@modules/batches/repositories/BatchesRepository';
import UpdateIdOfUserThatMadeLastChangeOnBatchService from '@modules/batches/services/UpdateIdOfUserThatMadeLastChangeOnBatchService';
import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import Portion from 'typeorm/entities/Portion';
import PortionsRepository from '../repositories/PortionsRepository';

interface PortionData {
    name: string;
    portionBatch: string;
    batchId: string;
}

export default class CreatePortionService {
    private batchesRepository = new BatchesRepository();
    private portionsRepository = new PortionsRepository();

    private updateIdOfUserThatMadeLastChangeOnBatchService =
        new UpdateIdOfUserThatMadeLastChangeOnBatchService();
    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(
        userId: string,
        portionData: PortionData,
    ): Promise<Portion> {
        const findedBatch = await this.batchesRepository.findById(
            portionData.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperationService.execute(
            findedBatch,
            userId,
        );

        const createdPortion = await this.portionsRepository.create(
            portionData,
        );

        await this.updateIdOfUserThatMadeLastChangeOnBatchService.execute(
            findedBatch,
            userId,
        );

        return createdPortion;
    }
}
