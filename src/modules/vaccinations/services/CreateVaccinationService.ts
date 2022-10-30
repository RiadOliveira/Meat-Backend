import AppError from 'errors/AppError';
import Vaccination from 'typeorm/entities/Vaccination';
import VaccinationService from './VaccinationService';

interface VaccinationData {
    name: string;
    vaccinationBatch: string;
    batchId: string;
}

export default class CreateVaccinationService extends VaccinationService {
    public async execute(
        userId: string,
        vaccinationData: VaccinationData,
    ): Promise<Vaccination> {
        const findedBatch = await this.batchesRepository.findById(
            vaccinationData.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const createdVaccination = await this.vaccinationsRepository.create(
            vaccinationData,
        );
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return createdVaccination;
    }
}
