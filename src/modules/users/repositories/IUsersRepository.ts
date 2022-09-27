import User from 'typeorm/entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';

export interface IUsersRepository {
    create(data: CreateUserDTO): Promise<User>;
    save(data: UpdateUserDTO): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    delete(userId: string): Promise<void>;
}
