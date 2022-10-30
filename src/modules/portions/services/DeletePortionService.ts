import AppError from 'errors/AppError';
import PortionService from './PortionService';

export default class DeletePortionService extends PortionService {
    public async execute(portionId: string, userId: string): Promise<void> {
        const findedPortion = await this.portionsRepository.findById(portionId);
        if (!findedPortion) throw new AppError('Portion not found', 404);

        await this.validateBatchRelatedEntityOperation(
            findedPortion.batch,
            userId,
        );

        await this.portionsRepository.delete(findedPortion.id);
    }
}
