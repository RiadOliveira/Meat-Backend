import AppError from 'errors/AppError';
import Vaccination from 'typeorm/entities/Vaccination';
import VaccinationService from './VaccinationService';

interface UpdateVaccinationData {
    id: string;
    name: string;
    vaccinationBatch: string;
}

export default class UpdateVaccinationService extends VaccinationService {
    public async execute(
        userId: string,
        updatedVaccinationData: UpdateVaccinationData,
    ): Promise<Vaccination> {
        const findedVaccination = await this.vaccinationsRepository.findById(
            updatedVaccinationData.id,
        );
        if (!findedVaccination)
            throw new AppError('Vaccination not found', 404);

        const findedBatch = await this.batchesRepository.findById(
            findedVaccination.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperation(findedBatch, userId);
        const updatedVaccination = await this.vaccinationsRepository.save(
            Object.assign(findedVaccination, updatedVaccinationData),
        );
        await this.updateIdOfUserThatMadeLastChangeOnBatch(findedBatch, userId);

        return updatedVaccination;
    }
}
