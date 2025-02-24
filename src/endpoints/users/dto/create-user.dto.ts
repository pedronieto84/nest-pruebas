export class CreateUserDto {
    userId: string;
    name: string;
    email: string;
    role: 'OWNER' | 'ADMIN' | 'USER';
    compId?: string;
    projId?: string;
    deptId?: string;
}
