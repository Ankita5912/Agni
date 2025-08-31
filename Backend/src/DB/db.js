import mongoose from "mongoose";
import { DB_NAME } from "../Constant/constant.js";

const DbConnection = async () => {
  try {
    const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log('mongo db connection succesfull');
  } catch (error) {
    console.log('error :', error);
    process.exit(1)
  }
}

export default DbConnection;