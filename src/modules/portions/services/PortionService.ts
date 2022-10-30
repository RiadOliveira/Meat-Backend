import BatchRelatedEntityService from '@modules/batches/services/BatchRelatedEntityService';
import PortionsRepository from '../repositories/PortionsRepository';

export default abstract class PortionService extends BatchRelatedEntityService {
    protected portionsRepository = new PortionsRepository();
}
