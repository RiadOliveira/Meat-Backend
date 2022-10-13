import Company from 'typeorm/entities/Company';
import User from 'typeorm/entities/User';
import { CreateCompanyDTO } from '../dtos/CreateCompanyDTO';
import { UpdateCompanyDTO } from '../dtos/UpdateCompanyDTO';

export interface ICompaniesRepository {
    create(data: CreateCompanyDTO): Promise<Company>;
    save(data: UpdateCompanyDTO): Promise<Company>;
    findById(id: string): Promise<Company | undefined>;
    findByAdmin(adminId: string): Promise<Company | undefined>;
    findByCnpj(cnpj: number): Promise<Company | undefined>;
    findAllEmployeesFromCompany(companyId: string): Promise<User[]>;
    delete(CompanyId: string): Promise<void>;
}
