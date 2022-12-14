import Company from 'typeorm/entities/Company';
import User from 'typeorm/entities/User';
import { CreateCompanyDTO } from '../dtos/CreateCompanyDTO';
import { UpdateCompanyDTO } from '../dtos/UpdateCompanyDTO';

export interface ICompaniesRepository {
    create(data: CreateCompanyDTO): Promise<Company>;
    save(data: UpdateCompanyDTO): Promise<Company>;
    findById(id: string): Promise<Company | undefined>;
    findByProducer(producerId: string): Promise<Company | undefined>;
    findByCnpj(cnpj: number): Promise<Company | undefined>;
    findAllMembersFromCompany(companyId: string): Promise<User[]>;
    delete(companyId: string): Promise<void>;
}
