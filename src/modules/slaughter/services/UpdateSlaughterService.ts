import BatchesRepository from '@modules/batches/repositories/BatchesRepository';
import UpdateIdOfUserThatMadeLastChangeOnBatchService from '@modules/batches/services/UpdateIdOfUserThatMadeLastChangeOnBatchService';
import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import Slaughter from 'typeorm/entities/Slaughter';
import SlaughterRepository from '../repositories/SlaughterRepository';

interface UpdateSlaughterData {
    id: string;
    method: string;
    description: string;
}

export default class UpdateSlaughterService {
    private slaughterRepository = new SlaughterRepository();
    private batchesRepository = new BatchesRepository();

    private updateIdOfUserThatMadeLastChangeOnBatchService =
        new UpdateIdOfUserThatMadeLastChangeOnBatchService();
    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

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

        await this.validateBatchRelatedEntityOperationService.execute(
            findedBatch,
            userId,
        );

        const updatedSlaughter = await this.slaughterRepository.save({
            ...findedSlaughter,
            ...updateSlaughterData,
        });

        await this.updateIdOfUserThatMadeLastChangeOnBatchService.execute(
            findedBatch,
            userId,
        );

        return updatedSlaughter;
    }
}
