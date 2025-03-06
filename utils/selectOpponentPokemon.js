const pokemonType = {
  Fire: ["Grass", "Poison", "Water", "Bug", "Flying", "Normal", "Fairy", "Ground", "Fighting", "Psychic"],
  Poison: ["Fire", "Water", "Bug", "Flying", "Grass", "Normal", "Fairy", "Ground", "Fighting", "Psychic"],
  Water: ["Grass", "Poison", "Fire", "Bug", "Flying", "Normal", "Fairy", "Ground", "Fighting", "Psychic"],
  Grass: ["Poison", "Water", "Fire", "Bug", "Flying", "Normal", "Fairy", "Ground", "Fighting", "Psychic"],
  Bug: ["Grass", "Poison", "Water", "Fire", "Flying", "Normal", "Fairy", "Ground", "Fighting", "Psychic"],
  Flying: ["Fire", "Poison", "Water", "Grass", "Bug", "Normal", "Fairy", "Ground", "Fighting", "Psychic"],
  Normal: ["Fire", "Poison", "Water", "Grass", "Bug", "Flying", "Fairy", "Ground", "Fighting", "Psychic"],
  Fairy: ["Fire", "Poison", "Water", "Grass", "Bug", "Flying", "Normal", "Ground", "Fighting", "Psychic"],
  Ground: ["Fire", "Poison", "Water", "Grass", "Bug", "Flying", "Normal", "Fairy", "Fighting", "Psychic"],
  Fighting: ["Fire", "Poison", "Water", "Grass", "Bug", "Flying", "Normal", "Fairy", "Ground", "Psychic"],
  Psychic: ["Fire", "Poison", "Water", "Grass", "Bug", "Flying", "Normal", "Fairy", "Ground", "Fighting"]
}

export const selectOpponentPokemon = ({
  pokemonList, 
  selectedPokemonType
}) => {
  const targetTypes = pokemonType[selectedPokemonType] || pokemonType.Water
  const filteredPokemonList = pokemonList?.filter(pokemonData => pokemonData?.type?.some(type => targetTypes?.includes(type)));
  const randomItem = filteredPokemonList[Math.floor(Math.random() * filteredPokemonList.length)];

  return randomItem;
}