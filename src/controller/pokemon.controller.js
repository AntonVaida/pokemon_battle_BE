import { pokemonService } from "../services/pokemon.service.js";

const getPokemonList = async(req, res) => {
  try {
    const { limit } = req.query;
    const pokemonData = await pokemonService.getPokemon(limit);

    res.json(pokemonData);
  } catch (error) {
     res.status(500).json({ message: 'Server error' });
  }
}

const addNewPokemon = async (req, res) => {
  try {
    const sendData = req.body;
    const newPokemon = await pokemonService.addNewPokemon(sendData);

    res.json(newPokemon);
  } catch (error) {
     res.status(500).json({ message: 'Server error' });
  }
}


export const pokemonController = {
  getPokemonList,
  addNewPokemon
}