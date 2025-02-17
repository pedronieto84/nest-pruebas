import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Company, company => company.projects)
    company: Company;

    @ManyToMany(() => User, user => user.projects)
    users: User[];
}
