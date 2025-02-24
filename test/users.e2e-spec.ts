import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let userId: string;

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

    afterEach(async () => {
        if (userId) {
            await request(app.getHttpServer())
                .delete(`/users/${userId}`)
                .expect(200);
        }
    });

    it('/POST users', async () => {
        const createUserDto = {
            email: 'test@example.com',
            name: 'Test User',
            role: 'WORKER',
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(createUserDto)
            .expect(201);

        userId = response.body.userId;

        expect(response.body).toHaveProperty('email', createUserDto.email);
        expect(response.body).toHaveProperty('name', createUserDto.name);
        expect(response.body).toHaveProperty('role', createUserDto.role);
        expect(response.body).toHaveProperty('userId');
    });
});
