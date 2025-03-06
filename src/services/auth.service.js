import 'dotenv/config.js';
import { User } from "../models/user.model.js";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";

const generateToken = (address) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined')
  }

  return jwt.sign({ address }, process.env.JWT_SECRET);
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


    return {token: generateToken(user.address), address: user?.address, message};
}


export const userService = {
  addNewUser,
  generateNotice,
  verify
}