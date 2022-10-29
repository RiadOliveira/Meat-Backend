import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
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

    @OneToOne(() => Batch, batch => batch.slaughter, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'batchId',
        referencedColumnName: 'id',
    })
    batch: Batch;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
