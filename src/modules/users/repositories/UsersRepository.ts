import { getRepository, Repository } from 'typeorm';
import User from 'typeorm/entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { IUsersRepository } from './IUsersRepository';

class UsersRepository implements IUsersRepository {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getRepository(User);
    }

    public async create(user: CreateUserDTO): Promise<User> {
        const newUser = this.usersRepository.create(user);
        await this.usersRepository.save(newUser);

        return newUser;
    }

    public async save(user: UpdateUserDTO): Promise<User> {
        return this.usersRepository.save(user);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findedUser = await this.usersRepository.findOne({
            where: { email },
        });

        return findedUser;
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne(id);
    }

    public async delete(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
    }
}

export default UsersRepository;
