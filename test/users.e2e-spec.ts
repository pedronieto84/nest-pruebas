import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/POST users', async () => {
        const createUserDto = {
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(createUserDto)
            .expect(201);

        expect(response.body).toHaveProperty('email', createUserDto.email);
        expect(response.body).toHaveProperty('name', createUserDto.name);
        expect(response.body).toHaveProperty('role', createUserDto.role);
        expect(response.body).toHaveProperty('userId');
    });
});
