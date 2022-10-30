import { Transform } from 'class-transformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { AnimalType } from 'types/AnimalType';
import { format } from 'date-fns';

import Company from './Company';
import Portion from './Portion';
import Slaughter from './Slaughter';
import User from './User';
import Vaccination from './Vaccination';

@Entity('batches')
export default class Batch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    race: string;

    @Column('timestamp with time zone')
    @Transform(({ value }) => format(new Date(value), 'dd/MM/yyyy'))
    creationDate: Date;

    @Column('timestamp with time zone')
    @Transform(({ value }) =>
        !value ? value : format(new Date(value), 'dd/MM/yyyy'),
    )
    endingDate?: Date;

    @Column({ type: 'enum', enum: AnimalType })
    animal: AnimalType;

    @Column('uuid')
    idOfUserThatMadeLastChange: string;

    @OneToOne(() => User, user => user)
    @JoinColumn({
        name: 'idOfUserThatMadeLastChange',
        referencedColumnName: 'id',
    })
    @Transform(({ value: { name } }) => ({ name }))
    userThatMadeLastChange: User;

    @Column('uuid')
    companyId: string;

    @ManyToOne(() => Company, company => company.batches, {
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE',
    })
    company: Company;

    @OneToMany(() => Vaccination, vaccination => vaccination.batch, {
        onUpdate: 'CASCADE',
    })
    vaccinations: Vaccination[];

    @OneToMany(() => Portion, portion => portion.batch, { onUpdate: 'CASCADE' })
    portions: Portion[];

    @OneToOne(() => Slaughter, slaughter => slaughter.batch, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    })
    slaughter: Slaughter;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
