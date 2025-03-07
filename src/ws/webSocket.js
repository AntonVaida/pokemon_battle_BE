import { WebSocketServer } from "ws";
import { gameController } from "../controller/game.controller.js";
import { verifyAccessToken } from "../../utils/verifyAccessToken.js";

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());

      verifyAccessToken({ws, data, req})

      console.log("Check")
      switch (data.type) {
        case "JOIN_GAME":
          gameController.joinGame({
            id: data?.pokemon?.id,
            hp: data?.pokemon?.base?.hp, 
            attack: data?.pokemon?.base?.attack, 
            defense: data?.pokemon?.base?.defense, 
            speed: data?.pokemon?.base?.speed, 
            name: data?.pokemon?.name?.english, 
            description: data?.pokemon?.description, 
            image: data?.pokemon?.image, 
            userId: data?.pokemon?.userId,
            spAttack: data?.pokemon?.base?.spAttack, 
            ws,
            type: data?.pokemon?.type,
            level: Number(data?.pokemon?.base?.evolution?.prev[0]) || 1,
          });
          break;
        case "ATTACK":
          gameController.attack({
            attackerId: data.attackerId, 
            targetId: data.targetId, 
            userId: data?.userId,
            attackPowerValueNumber: data?.attackPowerValueNumber || null,
            ws
          });
          break;
        case "DISCONNECT":
          gameController.disconnect({userId: data?.userId, ws});
          break;
        default:
          console.log("❌ Unknown team:", data.type);
      }
    });
  });
};
