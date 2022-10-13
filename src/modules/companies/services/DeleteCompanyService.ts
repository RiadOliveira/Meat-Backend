import AppError from 'errors/AppError';
import CompaniesRepository from '../repositories/CompaniesRepository';

export default class DeleteCompanyService {
    private companiesRepository = new CompaniesRepository();

    public async execute(adminId: string): Promise<void> {
        const findedCompany = await this.companiesRepository.findByAdmin(
            adminId,
        );
        if (!findedCompany) throw new AppError('Company not found.');

        await this.companiesRepository.delete(findedCompany.id);
    }
}
