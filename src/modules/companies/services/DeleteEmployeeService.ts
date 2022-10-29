import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from 'errors/AppError';
import { AccountType } from 'types/AccountType';

export default class DeleteEmployeeService {
    private usersRepository = new UsersRepository();

    public async execute(
        employeeId: string,
        producerId: string,
    ): Promise<void> {
        const findedUser = await this.usersRepository.findById(employeeId);
        if (!findedUser) {
            throw new AppError('Requested user not found');
        }

        if (findedUser.accountType === AccountType.PRODUCER) {
            throw new AppError('An producer cannot be deleted by another user');
        }

        const findedProducer = await this.usersRepository.findById(producerId);
        if (!findedProducer) {
            throw new AppError('Requested producer not found');
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

        await this.usersRepository.delete(employeeId);
    }
}
