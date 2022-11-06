import { AccountType } from 'types/AccountType';

export interface UpdateUserDTO {
    id: string;
    name: string;
    accountType: AccountType;
    password?: string;
}
