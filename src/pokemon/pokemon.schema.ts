import { Schema } from 'mongoose';

export const PokemonSchema = new Schema({
    name: String,
    type: String,
    level: Number,
});
