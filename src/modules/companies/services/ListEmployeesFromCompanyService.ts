import User from 'typeorm/entities/User';
import { AccountType } from 'types/AccountType';
import CompanyService from './CompanyService';

export default class ListEmployeesFromCompanyService extends CompanyService {
    public async execute(companyId: string): Promise<User[]> {
        const findedEmployees =
            await this.companiesRepository.findAllEmployeesFromCompany(
                companyId,
            );
        const producerIndex = findedEmployees.findIndex(
            ({ accountType }) => accountType === AccountType.PRODUCER,
        )!;

        if (producerIndex !== 0) {
            const firstEmployee = findedEmployees[0];
            findedEmployees[0] = findedEmployees[producerIndex];
            findedEmployees[producerIndex] = firstEmployee;
        }

        return findedEmployees;
    }
}
