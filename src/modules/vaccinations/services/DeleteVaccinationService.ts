import AppError from 'errors/AppError';
import VaccinationService from './VaccinationService';

export default class DeleteVaccinationService extends VaccinationService {
    public async execute(vaccinationId: string, userId: string): Promise<void> {
        const findedVaccination = await this.vaccinationsRepository.findById(
            vaccinationId,
        );
        if (!findedVaccination) {
            throw new AppError('Vaccination not found', 404);
        }

        await this.validateBatchRelatedEntityOperation(
            findedVaccination.batch,
            userId,
        );

        await this.vaccinationsRepository.delete(findedVaccination.id);
    }
}
