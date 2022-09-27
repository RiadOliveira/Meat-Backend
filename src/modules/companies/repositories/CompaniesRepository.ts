import Company from 'typeorm/entities/Company';

import { getRepository, Repository } from 'typeorm';
import { CreateCompanyDTO } from '../dtos/CreateCompanyDTO';
import { UpdateCompanyDTO } from '../dtos/UpdateCompanyDTO';
import { ICompaniesRepository } from './ICompaniesRepository';

class CompaniesRepository implements ICompaniesRepository {
    private companiesRepository: Repository<Company>;

    constructor() {
        this.companiesRepository = getRepository(Company);
    }

    public async create(company: CreateCompanyDTO): Promise<Company> {
        const newCompany = this.companiesRepository.create(company);
        await this.companiesRepository.save(newCompany);

        return newCompany;
    }

    public async save(company: UpdateCompanyDTO): Promise<Company> {
        return this.companiesRepository.save(company);
    }

    public async findById(id: string): Promise<Company | undefined> {
        return this.companiesRepository.findOne(id);
    }

    public async findByAdmin(adminId: string): Promise<Company | undefined> {
        return this.companiesRepository.findOne({ where: { adminId } });
    }

    public async delete(companyId: string): Promise<void> {
        await this.companiesRepository.delete(companyId);
    }
}

export default CompaniesRepository;
