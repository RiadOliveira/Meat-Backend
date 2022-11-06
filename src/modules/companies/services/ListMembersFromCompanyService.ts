import User from 'typeorm/entities/User';
import { AccountType } from 'types/AccountType';
import CompanyService from './CompanyService';

export default class ListMembersFromCompanyService extends CompanyService {
    public async execute(companyId: string): Promise<User[]> {
        const findedMembers =
            await this.companiesRepository.findAllMembersFromCompany(companyId);
        const producerIndex = findedMembers.findIndex(
            ({ accountType }) => accountType === AccountType.PRODUCER,
        )!;

        if (producerIndex !== 0) {
            const firstMember = findedMembers[0];
            findedMembers[0] = findedMembers[producerIndex];
            findedMembers[producerIndex] = firstMember;
        }

        return findedMembers;
    }
}
