import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    english: { type: String, required: true },
    japanese: { type: String, required: true },
    chinese: { type: String, required: true },
    french: { type: String, required: true }
  },
  type: { type: [String], required: true },
  base: {
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    spAttack: { type: Number, required: true },
    spDefense: { type: Number, required: true },
    speed: { type: Number, required: true }
  },
  species: { type: String, required: true },
  description: { type: String, required: true },
  evolution: {
    next: { type: [[String]], required: false }
  },
  profile: {
    height: { type: String, required: true },
    weight: { type: String, required: true },
    egg: { type: [String], required: true },
    ability: { type: [[String]], required: true },
    gender: { type: String, required: true }
  },
  image: {
    sprite: { type: String, required: true },
    thumbnail: { type: String, required: true },
    hires: { type: String, required: true }
  }
});

export const Pokemon = mongoose.model('Pokemon', PokemonSchema);