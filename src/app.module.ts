import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonSchema } from './pokemon/pokemon.schema';
import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest-pokemon'),
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    UsersModule,
  ],
  controllers: [AppController, PokemonController],
  providers: [AppService, PokemonService],
})
export class AppModule { }
