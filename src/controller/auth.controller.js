import { userService } from "../services/auth.service.js";
import { getTokenFromRequest } from "../../utils/getTokenFromRequest.js";

const getNonce = async (req, res) => {
  try {
    const { address } = req.query;
    const nonce = await userService.generateNotice({ address })

    res.json({ nonce });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const verifySignature = async (req, res) => {
  try {
    const { address, signature } = req.body;
    const data = await userService.verify({address, signature})
    
    res.json({ address: data?.address, nonce: data?.message, accessToken: data?.accessToken, refreshToken:  data?.refreshToken});
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
}

const updateAccessToken = async (req, res) => {
  try {
    const accessToken = getTokenFromRequest(req);
    const { address, refreshToken } = req.body;

    const data = await userService.updateAccessToken({address, accessToken,  refreshToken})
    
    res.json({ address: data?.address, nonce: data?.nonce, accessToken: data?.accessToken, refreshToken:  data?.refreshToken});
  } catch (error) {
    res.status(500).json({ message: 'UpdateAccessToken failed' });
  }
}

export const authController = {
  getNonce,
  verifySignature,
  updateAccessToken
}