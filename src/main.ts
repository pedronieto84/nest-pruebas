import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // PIPES para DTOS
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // Elimina propiedades no definidas en el DTO
        forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas
        transform: true, // Transforma los datos al tipo especificado en el DTO
    }),
);
  await app.listen(3000);
}
bootstrap();
