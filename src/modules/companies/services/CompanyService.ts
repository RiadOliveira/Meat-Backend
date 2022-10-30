import UsersRepository from '@modules/users/repositories/UsersRepository';
import CompaniesRepository from '../repositories/CompaniesRepository';

export default abstract class CompanyService {
    protected companiesRepository = new CompaniesRepository();
    protected usersRepository = new UsersRepository();
}
