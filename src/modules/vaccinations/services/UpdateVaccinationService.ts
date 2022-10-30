import BatchesRepository from '@modules/batches/repositories/BatchesRepository';
import UpdateIdOfUserThatMadeLastChangeOnBatchService from '@modules/batches/services/UpdateIdOfUserThatMadeLastChangeOnBatchService';
import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import Vaccination from 'typeorm/entities/Vaccination';
import VaccinationsRepository from '../repositories/VaccinationsRepository';

interface UpdateVaccinationData {
    id: string;
    name: string;
    vaccinationBatch: string;
}

export default class UpdateVaccinationService {
    private vaccinationsRepository = new VaccinationsRepository();
    private batchesRepository = new BatchesRepository();

    private updateIdOfUserThatMadeLastChangeOnBatchService =
        new UpdateIdOfUserThatMadeLastChangeOnBatchService();
    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(
        userId: string,
        updateVaccinationData: UpdateVaccinationData,
    ): Promise<Vaccination> {
        const findedVaccination = await this.vaccinationsRepository.findById(
            updateVaccinationData.id,
        );
        if (!findedVaccination)
            throw new AppError('Vaccination not found', 404);

        const findedBatch = await this.batchesRepository.findById(
            findedVaccination.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperationService.execute(
            findedBatch,
            userId,
        );

        const updatedVaccination = await this.vaccinationsRepository.save({
            ...findedVaccination,
            ...updateVaccinationData,
        });

        await this.updateIdOfUserThatMadeLastChangeOnBatchService.execute(
            findedBatch,
            userId,
        );

        return updatedVaccination;
    }
}
