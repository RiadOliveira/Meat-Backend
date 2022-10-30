import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import SlaughterRepository from '../repositories/SlaughterRepository';

export default class DeleteSlaughterService {
    private slaughterRepository = new SlaughterRepository();

    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(slaughterId: string, userId: string): Promise<void> {
        const findedSlaughter = await this.slaughterRepository.findById(
            slaughterId,
        );
        if (!findedSlaughter) {
            throw new AppError('Slaughter not found', 404);
        }

        await this.validateBatchRelatedEntityOperationService.execute(
            findedSlaughter.batch,
            userId,
        );

        await this.slaughterRepository.delete(findedSlaughter.id);
    }
}
