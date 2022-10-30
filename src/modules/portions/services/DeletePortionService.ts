import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import PortionsRepository from '../repositories/PortionsRepository';

export default class DeletePortionService {
    private portionsRepository = new PortionsRepository();

    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(portionId: string, userId: string): Promise<void> {
        const findedPortion = await this.portionsRepository.findById(portionId);
        if (!findedPortion) throw new AppError('Portion not found', 404);

        await this.validateBatchRelatedEntityOperationService.execute(
            findedPortion.batch,
            userId,
        );

        await this.portionsRepository.delete(findedPortion.id);
    }
}
