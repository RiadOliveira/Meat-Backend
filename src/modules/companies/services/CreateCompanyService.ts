import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from 'errors/AppError';
import Company from 'typeorm/entities/Company';
import CompaniesRepository from '../repositories/CompaniesRepository';

import { AccountType } from 'types/AccountType';

interface ProducerData {
    name: string;
    email: string;
    password: string;
}

export interface CompanyData {
    name: string;
    cnpj: number;
    city: string;
    state: string;
    producer: ProducerData;
}

export default class CreateCompanyService {
    private usersRepository = new UsersRepository();
    private companiesRepository = new CompaniesRepository();

    public async execute({
        producer,
        ...company
    }: CompanyData): Promise<Company> {
        const findedCompany = await this.companiesRepository.findByCnpj(
            company.cnpj,
        );
        if (findedCompany) throw new AppError("Company's cnpj already exists");

        const findedProducer = await this.usersRepository.findByEmail(
            producer.email,
        );
        if (findedProducer) throw new AppError("User's email already exists");

        const createdCompany = await this.companiesRepository.create(company);
        const createdProducer = await this.usersRepository.create({
            ...producer,
            accountType: AccountType.PRODUCER,
            companyId: createdCompany.id,
        });

        createdCompany.producerId = createdProducer.id;
        await this.companiesRepository.save(createdCompany);

        return createdCompany;
    }
}
