import 'dotenv/config.js';
import { User } from "../models/user.model.js";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";

const generateToken = (payload, expiresIn) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined')
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

const addNewUser = async({name, sessionToken}) => {
  try {
    const newUser = await User.create({name, sessionToken});

    return newUser;
  } catch (error) {
    console.log(error)
  }
}

const generateNotice = async ({address}) => {
  
  let user = await User.findOne({ address });

  if (!user) {
    user = new User({ address });
    await user.save();
  }

  return user?.nonce;
}

const verify = async ({address, signature}) => {
   const user = await User.findOne({ address });

    if (!user) {
      return null;
    }

    const message = user.nonce;
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return null;
    }

    user.nonce = Math.floor(Math.random() * 1000000).toString();
    await user.save();

    const accessToken = generateToken({address: user.address}, "1h");
    return {accessToken, refreshToken: generateToken({address: user.address, accessToken}, "7d"), address: user?.address, message};
}

const updateAccessToken = async({address, accessToken, refreshToken}) => {
  try {
    const user = await User.findOne({ address });

    if (!user) {
      return null;
    }

    let decodedUser = null;
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be defined')
      }

      decodedUser = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (typeof decodedUser !== "object" || decodedUser === null) {
      throw new Error("Invalid accessToken format");
    }

    if (decodedUser?.address !== address || decodedUser?.accessToken !== accessToken) {
      throw new Error("Invalid accessToken")
    }

    const newAccessToken = generateToken({address: address}, "1h");
    const newRefreshToken = generateToken({address: user.address, newAccessToken}, "7d");

    return { address,  nonce: user?.nonce, accessToken: newAccessToken, refreshToken: newRefreshToken }
  } catch (error) {
    throw new Error(error?.message)
  }
}


export const userService = {
  addNewUser,
  generateNotice,
  verify,
  updateAccessToken
}