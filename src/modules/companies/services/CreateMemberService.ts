import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import CompanyService from './CompanyService';

import { AccountType } from 'types/AccountType';

interface CreateMemberData {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
}

export default class CreateMemberService extends CompanyService {
    public async execute(
        producerId: string,
        createMemberData: CreateMemberData,
    ): Promise<User> {
        if (createMemberData.accountType === AccountType.PRODUCER) {
            throw new AppError('An producer cannot create another');
        }

        const findedUser = await this.usersRepository.findByEmail(
            createMemberData.email,
        );
        if (findedUser) throw new AppError("User's email already exists");

        const findedCompany = await this.companiesRepository.findByProducer(
            producerId,
        );
        if (!findedCompany) throw new AppError('Company not found', 404);

        return this.usersRepository.create({
            ...createMemberData,
            companyId: findedCompany.id,
        });
    }
}
