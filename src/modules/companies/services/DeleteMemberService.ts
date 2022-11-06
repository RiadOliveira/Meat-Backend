import AppError from 'errors/AppError';
import CompanyService from './CompanyService';

import { AccountType } from 'types/AccountType';

export default class DeleteMemberService extends CompanyService {
    public async execute(memberId: string, producerId: string): Promise<void> {
        const findedUser = await this.usersRepository.findById(memberId);
        if (!findedUser) {
            throw new AppError('Requested user not found', 404);
        }

        if (findedUser.accountType === AccountType.PRODUCER) {
            throw new AppError('An producer cannot be deleted by another user');
        }

        const findedProducer = await this.usersRepository.findById(producerId);
        if (!findedProducer) {
            throw new AppError('Requested producer not found', 404);
        }

        if (findedProducer.accountType !== AccountType.PRODUCER) {
            throw new AppError(
                'Requested producer id does not reference a producer',
            );
        }

        if (findedUser.companyId !== findedProducer.companyId) {
            throw new AppError(
                'Producer does not have permission to delete requested user',
            );
        }

        await this.usersRepository.delete(memberId);
    }
}
