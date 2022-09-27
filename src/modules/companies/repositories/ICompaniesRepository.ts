import Company from 'typeorm/entities/Company';
import { CreateCompanyDTO } from '../dtos/CreateCompanyDTO';
import { UpdateCompanyDTO } from '../dtos/UpdateCompanyDTO';

export interface ICompaniesRepository {
    create(data: CreateCompanyDTO): Promise<Company>;
    save(data: UpdateCompanyDTO): Promise<Company>;
    findById(id: string): Promise<Company | undefined>;
    findByAdmin(adminId: string): Promise<Company | undefined>;
    delete(CompanyId: string): Promise<void>;
}
