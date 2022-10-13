import User from 'typeorm/entities/User';
import CompaniesRepository from '../repositories/CompaniesRepository';

export default class ListEmployeesFromCompanyService {
    private companiesRepository = new CompaniesRepository();

    public async execute(companyId: string): Promise<User[]> {
        const findedEmployees =
            await this.companiesRepository.findAllEmployeesFromCompany(
                companyId,
            );

        return findedEmployees;
    }
}
