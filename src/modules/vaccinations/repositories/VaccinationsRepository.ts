import Vaccination from 'typeorm/entities/Vaccination';

import { getRepository, Repository } from 'typeorm';
import { CreateVaccinationDTO } from '../dtos/CreateVaccinationDTO';
import { UpdateVaccinationDTO } from '../dtos/UpdateVaccinationDTO';
import { IVaccinationsRepository } from './IVaccinationsRepository';

class VaccinationsRepository implements IVaccinationsRepository {
    private vaccinationsRepository: Repository<Vaccination>;

    constructor() {
        this.vaccinationsRepository = getRepository(Vaccination);
    }

    public async create(
        vaccination: CreateVaccinationDTO,
    ): Promise<Vaccination> {
        const newVaccination = this.vaccinationsRepository.create(vaccination);
        await this.vaccinationsRepository.save(newVaccination);

        return newVaccination;
    }

    public async save(vaccination: UpdateVaccinationDTO): Promise<Vaccination> {
        return this.vaccinationsRepository.save(vaccination);
    }

    public async findById(id: string): Promise<Vaccination | undefined> {
        return this.vaccinationsRepository.findOne({
            where: { id },
            relations: ['batch'],
        });
    }

    public async findAllFromBatch(batchId: string): Promise<Vaccination[]> {
        const findedVaccinations = await this.vaccinationsRepository.find({
            where: {
                batchId,
            },
        });

        return findedVaccinations;
    }

    public async delete(vaccinationId: string): Promise<void> {
        await this.vaccinationsRepository.delete(vaccinationId);
    }
}

export default VaccinationsRepository;
