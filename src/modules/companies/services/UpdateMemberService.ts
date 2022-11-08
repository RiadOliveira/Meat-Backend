import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import { AccountType } from 'types/AccountType';
import CompanyService from './CompanyService';

interface UpdateMemberData {
    name: string;
    email: string;
    memberId: string;
    accountType: AccountType;
    password?: string;
}

export default class UpdateMemberService extends CompanyService {
    public async execute(
        producerId: string,
        { name, email, password, accountType, memberId }: UpdateMemberData,
    ): Promise<User> {
        if (accountType === AccountType.PRODUCER) {
            throw new AppError(
                'It is not possible to have more than one producer',
            );
        }

        const findedProducer = await this.usersRepository.findById(producerId);
        if (!findedProducer) throw new AppError('Producer not found');

        if (findedProducer.accountType !== AccountType.PRODUCER) {
            throw new AppError(
                'This user does not have permission to execute this action',
                403,
            );
        }

        const findedUser = await this.usersRepository.findById(memberId);
        if (!findedUser) throw new AppError('Member not found');

        if (findedProducer.companyId !== findedUser.companyId) {
            throw new AppError(
                'This user does not have permission to execute this action',
                403,
            );
        }

        if (email !== findedUser.email) {
            const verifyEmail = await this.usersRepository.findByEmail(email);

            if (verifyEmail)
                throw new AppError(
                    'A user with the informed email already exists',
                );

            findedUser.email = email;
        }

        if (password) findedUser.password = password;
        findedUser.name = name;

        const updatedUser = this.usersRepository.save(findedUser);
        return updatedUser;
    }
}
