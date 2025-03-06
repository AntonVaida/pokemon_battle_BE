import express from 'express';
import { pokemonController } from '../controller/pokemon.controller.js';

export const pokemonRouter = express.Router();

pokemonRouter.get('/', pokemonController.getPokemonList);
pokemonRouter.post('/', pokemonController.addNewPokemon);