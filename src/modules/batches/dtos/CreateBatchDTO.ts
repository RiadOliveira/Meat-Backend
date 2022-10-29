import { AnimalType } from 'types/AnimalType';

export interface CreateBatchDTO {
    name: string;
    creationDate: Date;
    animal: AnimalType;
    race: string;
    city: string;
    state: string;
    companyId: string;
    idOfUserThatMadeLastChange: string;
}
