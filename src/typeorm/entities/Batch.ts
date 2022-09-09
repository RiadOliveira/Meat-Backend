import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
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
    adminId: string;

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
