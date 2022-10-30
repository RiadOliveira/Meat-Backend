import BatchesRepository from '@modules/batches/repositories/BatchesRepository';
import UpdateIdOfUserThatMadeLastChangeOnBatchService from '@modules/batches/services/UpdateIdOfUserThatMadeLastChangeOnBatchService';
import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import Slaughter from 'typeorm/entities/Slaughter';
import SlaughterRepository from '../repositories/SlaughterRepository';

interface SlaughterData {
    method: string;
    description: string;
    batchId: string;
}

export default class CreateSlaughterService {
    private batchesRepository = new BatchesRepository();
    private slaughterRepository = new SlaughterRepository();

    private updateIdOfUserThatMadeLastChangeOnBatchService =
        new UpdateIdOfUserThatMadeLastChangeOnBatchService();
    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(
        userId: string,
        slaughterData: SlaughterData,
    ): Promise<Slaughter> {
        const findedBatch = await this.batchesRepository.findById(
            slaughterData.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperationService.execute(
            findedBatch,
            userId,
        );

        const createdSlaughter = await this.slaughterRepository.create(
            slaughterData,
        );

        await this.updateIdOfUserThatMadeLastChangeOnBatchService.execute(
            findedBatch,
            userId,
        );

        return createdSlaughter;
    }
}
