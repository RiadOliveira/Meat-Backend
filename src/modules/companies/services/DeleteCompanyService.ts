import AppError from 'errors/AppError';
import CompaniesRepository from '../repositories/CompaniesRepository';

export default class DeleteCompanyService {
    private companiesRepository = new CompaniesRepository();

    public async execute(companyId: string): Promise<void> {
        const findedCompany = await this.companiesRepository.findById(
            companyId,
        );
        if (!findedCompany) throw new AppError('Company not found', 404);

        await this.companiesRepository.delete(findedCompany.id);
    }
}
