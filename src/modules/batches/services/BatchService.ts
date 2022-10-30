import UsersRepository from '@modules/users/repositories/UsersRepository';
import BatchesRepository from '../repositories/BatchesRepository';

export default abstract class BatchService {
    protected batchesRepository = new BatchesRepository();
    protected usersRepository = new UsersRepository();
}
