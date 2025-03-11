import jwt from "jsonwebtoken";
import { getTokenFromRequest } from "./getTokenFromRequest.js";

export const verifyAccessToken = async ({ws, data, req}) => {
  const accessToken = getTokenFromRequest(req);
  
  let decodedUser = null;

  try {
    if (!accessToken || accessToken === "null") {
      throw new Error("AccessToken required");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be defined')
    }

    decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (typeof decodedUser !== "object" || decodedUser === null) {
      throw new Error("Invalid accessToken format");
    }

    if (decodedUser?.address !== data?.userId) {
      throw new Error("Invalid accessToken")
    }
  } catch (error) {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "ERROR", message: error.message }));
    }

    setTimeout(() => {
      if (ws.readyState === ws.OPEN) {
        ws.close(4001, "Invalid accessToken");
      }
    }, 100);

    return;
  }

}