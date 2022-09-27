import Vaccination from 'typeorm/entities/Vaccination';
import { CreateVaccinationDTO } from '../dtos/CreateVaccinationDTO';
import { UpdateVaccinationDTO } from '../dtos/UpdateVaccinationDTO';

export interface IVaccinationsRepository {
    create(data: CreateVaccinationDTO): Promise<Vaccination>;
    save(data: UpdateVaccinationDTO): Promise<Vaccination>;
    findById(id: string): Promise<Vaccination | undefined>;
    findAllFromBatch(batchId: string): Promise<Vaccination[]>;
    delete(vaccinationId: string): Promise<void>;
}
