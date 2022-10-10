import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import UsersRepository from '../repositories/UsersRepository';
import { AccountType } from 'types/AccountType';

interface CreateUserData {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    private usersRepository = new UsersRepository();

    public async execute(createUserData: CreateUserData): Promise<User> {
        const findedUser = await this.usersRepository.findByEmail(
            createUserData.email,
        );
        if (findedUser) throw new AppError("User's email already exists");

        return this.usersRepository.create({
            ...createUserData,
            accountType: AccountType.PRODUCER,
        });
    }
}
