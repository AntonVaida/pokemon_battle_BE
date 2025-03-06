import { Player } from "../models/player.model.js";
import { pokemonService } from "./pokemon.service.js";
import { selectOpponentPokemon } from "../../utils/selectOpponentPokemon.js";

class GameService {
  constructor() {
    this.players = {};
  }

  async addPlayer ({id, hp, attack, defense, speed, name, description, image, userId, level, spAttack, type}) {
    if (this.players.hasOwnProperty(userId) && (
      !hp 
      || !attack 
      || !defense 
      || !speed 
      || !name 
      || !description 
      || !image 
      || !level 
      || !spAttack 
      || !type
    )) {
      return this.players[userId];
    }

    const yourPokemon = new Player(id, hp, attack, defense, speed, name, description, image, userId, level, spAttack);
    const pokemonList = await pokemonService.getAllPokemon();

    const selectedOpponentPokemon = selectOpponentPokemon({ 
      pokemonList, 
      selectedPokemonType: type
    })

      const opponentPokemon= new Player(
      selectedOpponentPokemon?.id, 
      selectedOpponentPokemon?.base?.hp, 
      selectedOpponentPokemon?.base?.attack, 
      selectedOpponentPokemon?.base?.defense, 
      selectedOpponentPokemon?.base?.speed, 
      selectedOpponentPokemon?.name?.english, 
      selectedOpponentPokemon?.description, 
      selectedOpponentPokemon?.image, 
      userId, 
      Number(selectedOpponentPokemon?.base?.evolution?.prev[0]) || 1, 
      selectedOpponentPokemon?.base?.["spAttack"], 
    );

    if (this.players.hasOwnProperty(userId)) {
      this.players[userId] = {
        yourPokemon,
        opponent: opponentPokemon,
        history: [],
        winner: null
      }
    } else {
      this.players = {
        ...this.players,
        [userId]: {
          yourPokemon,
          opponent: opponentPokemon,
          history: [],
          winner: null
        },
      }
    }

    return this.players[userId];
  }

  async attack(attackerId, targetId, userId, attackPowerValueNumber) {
    const randomCoefficient = Math.floor(Math.random() * 101);
    let attackPower = attackerId === "yourPokemon" ?  attackPowerValueNumber : randomCoefficient;
    const attackerPlayer = this.players[userId][attackerId];

    if (!attackerPlayer?.hp) {
      return this.players[userId];
    }

    const opponentDamage = attackerPlayer?.attackDamage({opponentDefense: this.players[userId][targetId]?.defense, attackPower});
    const opponentIsAlive = this.players[userId][targetId]?.takeDamage(opponentDamage);

    if (!opponentIsAlive) {
      this.players[userId].winner = attackerId
    }

    this.players[userId].history.unshift({
      attackerId,
      targetId,
      opponentDamage,
      attackPower
    })

    return this.players[userId];
  }

  disconnect(userId) {
    if ( this.players[userId]) {
      this.players[userId] = {}
    }
  }
}

export const gameService = new GameService();
