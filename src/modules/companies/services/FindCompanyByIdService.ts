import AppError from 'errors/AppError';
import Company from 'typeorm/entities/Company';
import CompanyService from './CompanyService';

export default class FindCompanyByIdService extends CompanyService {
    public async execute(companyId: string): Promise<Company> {
        const findedCompany = await this.companiesRepository.findById(
            companyId,
        );
        if (!findedCompany) throw new AppError('Company not found', 404);

        return findedCompany;
    }
}
