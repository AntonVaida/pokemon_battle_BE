import { gameService } from "../services/game.service.js";

export const gameController = {
  joinGame: async ({id, hp, attack, defense, speed, name, description, image, userId, level, spAttack, ws, type}) => {
    try {
      const players = await gameService.addPlayer({id, hp, attack, defense, speed, name, description, image, userId, level, spAttack, type});

      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "PLAYER_JOINED", players }));
      }
    } catch (error) {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "ERROR", message: error.message }));
      }
    }
  },

  attack: async ({attackerId, targetId, userId, attackPowerValueNumber, ws}) => {
    try {
      const updatedPlayers = await gameService.attack(attackerId, targetId, userId, attackPowerValueNumber);

      if (updatedPlayers) {
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ type: "UPDATE_STATE", players: updatedPlayers }));
        }
      }
    } catch (error) {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "ERROR", message: error.message }));
      }
    }
  },

  disconnect: async({userId, ws}) => {
    try {
      gameService.disconnect(userId)
    } catch (error) {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "ERROR", message: error.message }));
      }
    }
  }
};
