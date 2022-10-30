import User from 'typeorm/entities/User';
import CompanyService from './CompanyService';

export default class ListEmployeesFromCompanyService extends CompanyService {
    public async execute(companyId: string): Promise<User[]> {
        const findedEmployees =
            await this.companiesRepository.findAllEmployeesFromCompany(
                companyId,
            );

        return findedEmployees;
    }
}
