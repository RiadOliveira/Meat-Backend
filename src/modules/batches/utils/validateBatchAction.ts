import AppError from 'errors/AppError';
import User from 'typeorm/entities/User';
import { AccountType } from 'types/AccountType';

export const validateBatchAction = ({ accountType }: User, action: string) => {
    const userIsNotProducer = accountType !== AccountType.PRODUCER;
    const userIsNotZootechnologist =
        accountType !== AccountType.ZOOTECHNOLOGIST;

    if (userIsNotProducer && userIsNotZootechnologist) {
        throw new AppError(
            'This user does not have permission to ' + action + ' a batch',
            403,
        );
    }
};
