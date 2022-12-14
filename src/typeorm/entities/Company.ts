import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Batch from './Batch';
import User from './User';

@Entity('companies')
export default class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cnpj: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column('uuid')
    producerId: string;

    @OneToMany(() => User, user => user.company)
    members: User[];

    @OneToMany(() => Batch, batch => batch.company)
    batches: Batch[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
