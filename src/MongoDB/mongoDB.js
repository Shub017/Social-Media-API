import mongoose from "mongoose";

const connectionURL = process.env.mongoDBLink;

export const connectToDB = async () => {
  try {
    await mongoose.connect(connectionURL);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.error(err);
  }
};
