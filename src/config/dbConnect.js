import mongoose from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.DB_CONECT);

const db = mongoose.connection;

export default db;
