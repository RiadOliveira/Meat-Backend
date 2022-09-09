import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import Batch from './Batch';

@Entity('portions')
export default class Portion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    portionBatch: string;

    @Column('uuid')
    batchId?: string;

    @ManyToOne(() => Batch, batch => batch.portions, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    batch: Batch;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
