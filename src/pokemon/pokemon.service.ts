import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './pokemon.interface';

@Injectable()
export class PokemonService {
    constructor(@InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>) { }

    async create(pokemon: Pokemon): Promise<Pokemon> {
        const createdPokemon = new this.pokemonModel(pokemon);
        return createdPokemon.save();
    }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonModel.find().exec();
    }
}
