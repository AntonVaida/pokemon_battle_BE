import { userService } from "../services/auth.service.js";

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
    
    res.json({ address: data?.address, nonce: data?.message, token: data?.token});
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
}

export const authController = {
  getNonce,
  verifySignature,
}