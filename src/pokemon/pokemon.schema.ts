import { Schema } from 'mongoose';

export const PokemonSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, required: true },
});
