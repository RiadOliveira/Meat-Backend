import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import Batch from './Batch';

@Entity('vaccinations')
export default class Vaccination {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    vaccinationBatch: string;

    @Column('uuid')
    batchId?: string;

    @ManyToOne(() => Batch, batch => batch.vaccinations, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    batch: Batch;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
