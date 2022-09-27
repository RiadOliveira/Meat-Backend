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
    adminId: string;

    @OneToMany(() => User, user => user.company)
    employees: User[];

    @OneToMany(() => Batch, batch => batch.company)
    batches: Batch[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
