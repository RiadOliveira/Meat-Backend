import { CreateVaccinationDTO } from './CreateVaccinationDTO';

export interface UpdateVaccinationDTO
    extends Omit<CreateVaccinationDTO, 'batchId'> {
    id: string;
}
