import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import Batch from './Batch';

@Entity('slaughter')
export default class Slaughter {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    method: string;

    @Column()
    wellTreated: boolean;

    @Column('uuid')
    batchId?: string;

    @ManyToOne(() => Batch, batch => batch.slaughter, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    batch: Batch;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
