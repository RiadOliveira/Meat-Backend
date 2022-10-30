import AppError from 'errors/AppError';
import SlaughterService from './SlaughterService';

export default class DeleteSlaughterService extends SlaughterService {
    public async execute(slaughterId: string, userId: string): Promise<void> {
        const findedSlaughter = await this.slaughterRepository.findById(
            slaughterId,
        );
        if (!findedSlaughter) {
            throw new AppError('Slaughter not found', 404);
        }

        await this.validateBatchRelatedEntityOperation(
            findedSlaughter.batch,
            userId,
        );

        await this.slaughterRepository.delete(findedSlaughter.id);
    }
}
