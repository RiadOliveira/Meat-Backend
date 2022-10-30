import { CreateSlaughterDTO } from './CreateSlaughterDTO';

export interface UpdateSlaughterDTO
    extends Omit<CreateSlaughterDTO, 'batchId'> {
    id: string;
}
