import mongoose from "mongoose";

const connection = async () => {
  try {
    const connectionURL = process.env.MONGO_DB_URI;

    if (!connectionURL) {
      throw new Error("Wrong connectionURL")
    }
    await mongoose.connect(connectionURL)
  } catch (error) {
    console.log(error);
  }
}

export const db = {
  connection
}