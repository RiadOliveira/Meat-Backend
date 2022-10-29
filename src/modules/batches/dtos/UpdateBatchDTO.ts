import { CreateBatchDTO } from './CreateBatchDTO';

export interface UpdateBatchDTO extends CreateBatchDTO {
    id: string;
    endingDate?: Date;
}
