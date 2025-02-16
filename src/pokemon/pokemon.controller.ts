import { Controller, Get, Post, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.interface';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Post()
    async create(@Body() pokemon: Pokemon) {
        return this.pokemonService.create(pokemon);
    }

    @Get()
    async findAll() {
        return this.pokemonService.findAll();
    }
}
