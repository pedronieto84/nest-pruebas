import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Company, company => company.departments)
    company: Company;

    @OneToMany(() => User, user => user.department)
    users: User[];
}
