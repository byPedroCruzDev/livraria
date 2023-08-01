import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://pedrocruz:1234@cluster0.1n3hkqk.mongodb.net/?retryWrites=true&w=majority"
);

let db = mongoose.connection;

export default db;
