import { AccountType } from 'types/AccountType';

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
}
