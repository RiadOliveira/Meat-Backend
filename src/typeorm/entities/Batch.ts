import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import Company from './Company';
import Portion from './Portion';
import Slaughter from './Slaughter';
import Vaccination from './Vaccination';

@Entity('batches')
export default class Batch {
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
    companyId: string;

    @ManyToOne(() => Company, company => company.batches, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    company: Company;

    @OneToMany(() => Vaccination, vaccination => vaccination.batch)
    vaccinations: Vaccination[];

    @OneToMany(() => Portion, portion => portion.batch)
    portions: Portion[];

    @OneToMany(() => Slaughter, slaughter => slaughter.batch)
    slaughter: Slaughter[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
