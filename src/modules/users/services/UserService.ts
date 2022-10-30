import UsersRepository from '../repositories/UsersRepository';

export default abstract class UserService {
    protected usersRepository = new UsersRepository();
}
