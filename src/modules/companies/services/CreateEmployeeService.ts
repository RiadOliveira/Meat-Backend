import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import CompanyService from './CompanyService';

import { AccountType } from 'types/AccountType';

interface CreateEmployeeData {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
}

export default class CreateEmployeeService extends CompanyService {
    public async execute(
        producerId: string,
        createEmployeeData: CreateEmployeeData,
    ): Promise<User> {
        if (createEmployeeData.accountType === AccountType.PRODUCER) {
            throw new AppError('An producer cannot create another');
        }

        const findedUser = await this.usersRepository.findByEmail(
            createEmployeeData.email,
        );
        if (findedUser) throw new AppError("User's email already exists");

        const findedCompany = await this.companiesRepository.findByProducer(
            producerId,
        );
        if (!findedCompany) throw new AppError('Company not found', 404);

        return this.usersRepository.create({
            ...createEmployeeData,
            companyId: findedCompany.id,
        });
    }
}
