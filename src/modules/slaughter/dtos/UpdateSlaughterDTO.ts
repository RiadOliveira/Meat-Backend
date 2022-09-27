import { CreateBatchDTO } from '@modules/batches/dtos/CreateBatchDTO';

export interface UpdateSlaughterDTO extends Omit<CreateBatchDTO, 'batchId'> {
    id: string;
}
