import BatchRelatedEntityService from '@modules/batches/services/BatchRelatedEntityService';
import VaccinationsRepository from '../repositories/VaccinationsRepository';

export default abstract class VaccinationService extends BatchRelatedEntityService {
    protected vaccinationsRepository = new VaccinationsRepository();
}
