import mongoose from "mongoose";

async function connetToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Error Connecting MongoDB", error.message);
    process.exit(1);
  }
}

export default connetToDB;
