import AppError from 'errors/AppError';
import Company from 'typeorm/entities/Company';
import CompaniesRepository from '../repositories/CompaniesRepository';

export default class FindCompanyByIdService {
    private companiesRepository = new CompaniesRepository();

    public async execute(companyId: string): Promise<Company> {
        const findedCompany = await this.companiesRepository.findById(
            companyId,
        );
        if (!findedCompany) throw new AppError('Company not found');

        return findedCompany;
    }
}
