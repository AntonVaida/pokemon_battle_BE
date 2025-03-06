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

    res.cookie("accessToken", data?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 35 * 60 * 1000,
    });
    
    res.json({ address: data?.address, nonce: data?.message });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
}

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: new Date(0) 
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
}

export const authController = {
  getNonce,
  verifySignature,
  logout
}