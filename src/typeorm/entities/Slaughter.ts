import { Transform } from 'class-transformer';
import { format } from 'date-fns';
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
    description: string;

    @Column('uuid')
    batchId: string;

    @OneToOne(() => Batch, batch => batch.slaughter, {
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'batchId',
        referencedColumnName: 'id',
    })
    batch: Batch;

    @Column('timestamp with time zone')
    @Transform(({ value }) =>
        !value ? value : format(new Date(value), 'dd/MM/yyyy'),
    )
    slaughterDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
