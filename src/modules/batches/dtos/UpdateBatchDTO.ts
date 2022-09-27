import { CreateBatchDTO } from './CreateBatchDTO';

export interface UpdateBatchDTO extends Omit<CreateBatchDTO, 'companyId'> {
    id: string;
}
