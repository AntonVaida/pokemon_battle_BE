import { Pokemon } from "../models/pokemon.model.js";

const getAllPokemon = async() => {
  const pokemonList = await Pokemon.find()

  return pokemonList;
}

const getPokemon = async(limit) => {
  const totalCount = await Pokemon.countDocuments();
  const pokemonList = await Pokemon.find().limit(limit)
      .limit(limit);
  const allItemsReached = limit > totalCount;

  return {
    pokemonList,
    allItemsReached
  };
}

const addNewPokemon = async (pokemonData) => {
  try {
    const newPokemon = await Pokemon.create({
    id: pokemonData?.id, 
    name: pokemonData?.name,
    type: pokemonData?.type,
    base: {
      hp: pokemonData.base.HP,
      attack: pokemonData.base.Attack,
      defense: pokemonData.base.Defense,
      spAttack: pokemonData.base["Sp. Attack"],
      spDefense: pokemonData.base["Sp. Defense"],
      speed: pokemonData.base.Speed
    },
    species: pokemonData?.species,
    description: pokemonData?.description,
    evolution: pokemonData?.evolution,
    profile: pokemonData?.profile,
    image: pokemonData?.image
  })

  return newPokemon;
  } catch (error) {
    console.log(error)
  }
}

export const pokemonService = {
  getAllPokemon,
  addNewPokemon,
  getPokemon
}