import AppError from 'errors/AppError';
import Company from 'typeorm/entities/Company';
import CompaniesRepository from '../repositories/CompaniesRepository';

export interface CompanyData {
    name: string;
    city: string;
    state: string;
}

export default class UpdateCompanyService {
    private companiesRepository = new CompaniesRepository();

    public async execute(
        adminId: string,
        updatedCompany: CompanyData,
    ): Promise<Company> {
        const findedCompany = await this.companiesRepository.findByAdmin(
            adminId,
        );
        if (!findedCompany) {
            throw new AppError('User is not related to any company.');
        }

        return this.companiesRepository.save({
            ...findedCompany,
            ...updatedCompany,
        });
    }
}
