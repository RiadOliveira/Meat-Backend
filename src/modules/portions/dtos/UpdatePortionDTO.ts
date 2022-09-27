import { CreatePortionDTO } from './CreatePortionDTO';

export interface UpdatePortionDTO extends Omit<CreatePortionDTO, 'batchId'> {
    id: string;
}
