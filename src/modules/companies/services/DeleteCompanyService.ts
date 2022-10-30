import AppError from 'errors/AppError';
import CompanyService from './CompanyService';

export default class DeleteCompanyService extends CompanyService {
    public async execute(companyId: string): Promise<void> {
        const findedCompany = await this.companiesRepository.findById(
            companyId,
        );
        if (!findedCompany) throw new AppError('Company not found', 404);

        await this.companiesRepository.delete(findedCompany.id);
    }
}
