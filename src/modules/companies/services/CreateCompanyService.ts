import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from 'errors/AppError';
import Company from 'typeorm/entities/Company';
import { AccountType } from 'types/AccountType';
import CompaniesRepository from '../repositories/CompaniesRepository';

export interface CompanyData {
    name: string;
    cnpj: number;
    city: string;
    state: string;
    adminId: string;
}

export default class CreateCompanyService {
    private usersRepository = new UsersRepository();
    private companiesRepository = new CompaniesRepository();

    public async execute(company: CompanyData): Promise<Company> {
        const findedCompany = await this.companiesRepository.findByCnpj(
            company.cnpj,
        );
        if (findedCompany) throw new AppError("Company's cnpj already exists.");

        const findedUser = await this.usersRepository.findById(company.adminId);
        if (!findedUser) throw new AppError('User not found.');

        if (findedUser.companyId) {
            throw new AppError(
                'The requested user already is associated to a company.',
            );
        }

        if (findedUser.accountType !== AccountType.PRODUCER) {
            throw new AppError(
                'Requested user does not have a producer account.',
            );
        }

        const newCompany = await this.companiesRepository.create(company);
        findedUser.companyId = newCompany.id;
        await this.usersRepository.save(findedUser);

        return newCompany;
    }
}
