import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import UsersRepository from '../repositories/UsersRepository';
import { AccountType } from 'types/AccountType';

interface CreateSubUserData {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
    producerId: string;
}

export default class CreateSubUserService {
    private usersRepository = new UsersRepository();

    public async execute(createSubUserData: CreateSubUserData): Promise<User> {
        if (createSubUserData.accountType === AccountType.PRODUCER) {
            throw new AppError('An producer cannot create another');
        }

        const findedUser = await this.usersRepository.findByEmail(
            createSubUserData.email,
        );
        if (findedUser) throw new AppError("User's email already exists");

        const findedProducer = await this.usersRepository.findById(
            createSubUserData.producerId,
        );
        if (!findedProducer) throw new AppError('Producer not found');

        if (findedProducer.accountType !== AccountType.PRODUCER) {
            throw new AppError(
                'Requested producer id does not reference a producer',
            );
        }

        return this.usersRepository.create(createSubUserData);
    }
}