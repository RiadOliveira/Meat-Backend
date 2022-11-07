import { Transform } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { formatDateWithoutTimezone } from 'utils/formatDateWithoutTimezone';
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

    @Column('timestamp')
    @Transform(({ value }) => formatDateWithoutTimezone(value))
    slaughterDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
