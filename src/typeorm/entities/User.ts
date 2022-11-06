import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { AccountType } from 'types/AccountType';
import { Exclude } from 'class-transformer';
import Company from './Company';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ type: 'enum', enum: AccountType })
    accountType: AccountType;

    @Column('uuid')
    companyId: string;

    @ManyToOne(() => Company, company => company.members, {
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE',
    })
    company: Company;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
