import BatchRelatedEntityService from '@modules/batches/services/BatchRelatedEntityService';
import SlaughterRepository from '../repositories/SlaughterRepository';

export default abstract class SlaughterService extends BatchRelatedEntityService {
    protected slaughterRepository = new SlaughterRepository();
}
