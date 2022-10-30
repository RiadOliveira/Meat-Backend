import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import VaccinationsRepository from '../repositories/VaccinationsRepository';

export default class DeleteVaccinationService {
    private vaccinationsRepository = new VaccinationsRepository();

    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(vaccinationId: string, userId: string): Promise<void> {
        const findedVaccination = await this.vaccinationsRepository.findById(
            vaccinationId,
        );
        if (!findedVaccination) {
            throw new AppError('Vaccination not found', 404);
        }

        await this.validateBatchRelatedEntityOperationService.execute(
            findedVaccination.batch,
            userId,
        );

        await this.vaccinationsRepository.delete(findedVaccination.id);
    }
}
