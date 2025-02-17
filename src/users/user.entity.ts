import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { Department } from '../departments/entities/department.entity';
import { Project } from '../projects/entities/project.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Company, company => company.users)
    company: Company;

    @ManyToOne(() => Department, department => department.users)
    department: Department;

    @ManyToMany(() => Project, project => project.users)
    @JoinTable()
    projects: Project[];
}
