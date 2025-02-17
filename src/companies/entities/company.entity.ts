import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Department, department => department.company)
    departments: Department[];

    @OneToMany(() => Project, project => project.company)
    projects: Project[];
}
