import { Department } from '../../departments/entities/department.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Company {
    @OneToMany(() => Department, department => department.company)
    departments: Department[];
}
