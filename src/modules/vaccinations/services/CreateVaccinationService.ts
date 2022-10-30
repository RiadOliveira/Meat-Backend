import BatchesRepository from '@modules/batches/repositories/BatchesRepository';
import UpdateIdOfUserThatMadeLastChangeOnBatchService from '@modules/batches/services/UpdateIdOfUserThatMadeLastChangeOnBatchService';
import ValidateBatchRelatedEntityOperationService from '@modules/batches/services/ValidateBatchRelatedEntityOperationService';
import AppError from 'errors/AppError';
import Vaccination from 'typeorm/entities/Vaccination';
import VaccinationsRepository from '../repositories/VaccinationsRepository';

interface VaccinationData {
    name: string;
    vaccinationBatch: string;
    batchId: string;
}

export default class CreateVaccinationService {
    private batchesRepository = new BatchesRepository();
    private vaccinationsRepository = new VaccinationsRepository();

    private updateIdOfUserThatMadeLastChangeOnBatchService =
        new UpdateIdOfUserThatMadeLastChangeOnBatchService();
    private validateBatchRelatedEntityOperationService =
        new ValidateBatchRelatedEntityOperationService();

    public async execute(
        userId: string,
        vaccinationData: VaccinationData,
    ): Promise<Vaccination> {
        const findedBatch = await this.batchesRepository.findById(
            vaccinationData.batchId,
        );
        if (!findedBatch) throw new AppError('Batch not found', 404);

        await this.validateBatchRelatedEntityOperationService.execute(
            findedBatch,
            userId,
        );

        const createdVaccination = await this.vaccinationsRepository.create(
            vaccinationData,
        );

        await this.updateIdOfUserThatMadeLastChangeOnBatchService.execute(
            findedBatch,
            userId,
        );

        return createdVaccination;
    }
}
